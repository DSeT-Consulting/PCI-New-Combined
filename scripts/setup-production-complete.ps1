#!/usr/bin/env pwsh

# Complete Production Setup for Paralympic Committee of India
# Resource Group: pci-prod
# Cluster: pci-production-aks

Write-Host "🏆 Setting up Paralympic Committee of India Production Environment" -ForegroundColor Green
Write-Host "Resource Group: pci-prod" -ForegroundColor Cyan
Write-Host "Cluster: pci-production-aks" -ForegroundColor Cyan

# Step 1: Get production cluster credentials
Write-Host "`n🔑 Getting production cluster credentials..." -ForegroundColor Green
az aks get-credentials --resource-group pci-prod --name pci-production-aks --overwrite-existing

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to get production cluster credentials!" -ForegroundColor Red
    Write-Host "Make sure you're logged into Azure and have access to pci-prod resource group" -ForegroundColor Yellow
    exit 1
}

# Step 2: Switch to production context
Write-Host "🔄 Switching to production cluster..." -ForegroundColor Green
kubectl config use-context pci-production-aks

# Step 3: Verify cluster connectivity
Write-Host "🔍 Verifying production cluster connectivity..." -ForegroundColor Green
$nodes = kubectl get nodes --no-headers 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Cannot connect to production cluster!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Connected to production cluster successfully!" -ForegroundColor Green
Write-Host "Available nodes: $($nodes.Count)" -ForegroundColor Cyan

# Step 4: Create production namespace
Write-Host "`n📁 Creating production namespace..." -ForegroundColor Green
kubectl create namespace pci-production --dry-run=client -o yaml | kubectl apply -f -

# Step 5: Create ACR secret for production
Write-Host "🔐 Setting up production ACR access..." -ForegroundColor Green
$acrName = "pciregistry"
$resourceGroup = "pci-prod"

# Get ACR login server
$acrServer = az acr show --name $acrName --resource-group $resourceGroup --query loginServer --output tsv
$acrUsername = az acr credential show --name $acrName --resource-group $resourceGroup --query username --output tsv
$acrPassword = az acr credential show --name $acrName --resource-group $resourceGroup --query passwords[0].value --output tsv

kubectl create secret docker-registry acr-secret `
  --docker-server=$acrServer `
  --docker-username=$acrUsername `
  --docker-password=$acrPassword `
  --namespace=pci-production `
  --dry-run=client -o yaml | kubectl apply -f -

Write-Host "✅ Production environment setup complete!" -ForegroundColor Green
Write-Host "`n🚀 Ready to build and deploy Paralympic Committee of India to production!" -ForegroundColor Yellow
