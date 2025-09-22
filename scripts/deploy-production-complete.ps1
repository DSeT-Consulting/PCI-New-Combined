#!/usr/bin/env pwsh

# Complete Production Deployment for Paralympic Committee of India
# Resource Group: pci-prod  
# Cluster: pci-production-aks

Write-Host "🏆 Paralympic Committee of India - Production Deployment" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green

# Step 1: Setup production cluster access
Write-Host "`n🔑 Step 1: Setting up production cluster access..." -ForegroundColor Yellow
Write-Host "Resource Group: pci-prod" -ForegroundColor Cyan
Write-Host "Cluster: pci-production-aks" -ForegroundColor Cyan

az aks get-credentials --resource-group pci-prod --name pci-production-aks --overwrite-existing

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to get production cluster credentials!" -ForegroundColor Red
    Write-Host "Make sure you're logged into Azure CLI and have access to pci-prod resource group" -ForegroundColor Yellow
    exit 1
}

kubectl config use-context pci-production-aks
Write-Host "✅ Connected to production cluster!" -ForegroundColor Green

# Step 2: Verify cluster and push images
Write-Host "`n🚀 Step 2: Pushing images to production registry..." -ForegroundColor Yellow

# Push frontend image
Write-Host "📦 Pushing frontend image..." -ForegroundColor Cyan
docker push pciregistry.azurecr.io/pci-frontend:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push frontend image!" -ForegroundColor Red
    Write-Host "Make sure you're logged into ACR: az acr login --name pciregistry" -ForegroundColor Yellow
    exit 1
}

# Push backend image  
Write-Host "📦 Pushing backend image..." -ForegroundColor Cyan
docker push pciregistry.azurecr.io/pci-backend:latest

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to push backend image!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All images pushed successfully!" -ForegroundColor Green

# Step 3: Create namespace and secrets
Write-Host "`n🔐 Step 3: Setting up production environment..." -ForegroundColor Yellow

# Create namespace
kubectl create namespace pci-production --dry-run=client -o yaml | kubectl apply -f -

# Create ACR secret
$acrName = "pciregistry"
$resourceGroup = "pci-prod"

Write-Host "Creating ACR access secret..." -ForegroundColor Cyan
$acrServer = az acr show --name $acrName --resource-group $resourceGroup --query loginServer --output tsv
$acrUsername = az acr credential show --name $acrName --resource-group $resourceGroup --query username --output tsv
$acrPassword = az acr credential show --name $acrName --resource-group $resourceGroup --query passwords[0].value --output tsv

kubectl create secret docker-registry acr-secret `
  --docker-server=$acrServer `
  --docker-username=$acrUsername `
  --docker-password=$acrPassword `
  --namespace=pci-production `
  --dry-run=client -o yaml | kubectl apply -f -

# Create application secrets
Write-Host "Creating application secrets..." -ForegroundColor Cyan
kubectl create secret generic pci-backend-secrets `
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" `
  --namespace=pci-production `
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic pci-frontend-secrets `
  --from-literal=nextauth-secret="your-nextauth-secret-here" `
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" `
  --namespace=pci-production `
  --dry-run=client -o yaml | kubectl apply -f -

Write-Host "✅ Environment setup complete!" -ForegroundColor Green

# Step 4: Deploy application
Write-Host "`n🚀 Step 4: Deploying Paralympic Committee of India..." -ForegroundColor Yellow
kubectl apply -k k8s/overlays/production

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Deployment submitted successfully!" -ForegroundColor Green

# Step 5: Wait for deployments
Write-Host "`n⏳ Step 5: Waiting for deployments to be ready..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Cyan

kubectl wait --for=condition=available deployment --all -n pci-production --timeout=600s

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All deployments are ready!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Deployments are taking longer than expected." -ForegroundColor Yellow
    Write-Host "Check status with: kubectl get pods -n pci-production" -ForegroundColor Cyan
}

# Step 6: Get access information
Write-Host "`n🌐 Step 6: Getting access information..." -ForegroundColor Yellow

# Get ingress IP
$ingress = kubectl get ingress -n pci-production -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>$null

if ($ingress) {
    Write-Host "🎉 PRODUCTION DEPLOYMENT COMPLETE!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "🌐 Paralympic Committee of India Production Site:" -ForegroundColor Yellow
    Write-Host "   http://$ingress" -ForegroundColor Cyan
    Write-Host "   http://$ingress/news" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor White
    Write-Host "🏆 Ready for paralympicindia.com domain setup!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Ingress IP not yet assigned." -ForegroundColor Yellow
    Write-Host "Check status with: kubectl get ingress -n pci-production" -ForegroundColor Cyan
}

# Show final status
Write-Host "`n📊 Production Status:" -ForegroundColor Yellow
kubectl get pods,services,ingress -n pci-production

Write-Host "`n🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Test the production site using the IP address above" -ForegroundColor Cyan
Write-Host "2. Configure paralympicindia.com DNS to point to the ingress IP" -ForegroundColor Cyan
Write-Host "3. Paralympic Committee of India will be live!" -ForegroundColor Cyan
