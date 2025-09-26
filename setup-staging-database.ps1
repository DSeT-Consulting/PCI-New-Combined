# Setup Staging Database Script
# This script deploys the PostgreSQL database for staging environment

Write-Host "🏆 Setting up PCI Staging Database 🏆" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Set variables
$RESOURCE_GROUP = "PCI"
$AKS_CLUSTER = "pci-staging-aks"
$NAMESPACE = "pci-staging"

Write-Host "`n📋 Configuration:" -ForegroundColor Cyan
Write-Host "Resource Group: $RESOURCE_GROUP"
Write-Host "AKS Cluster: $AKS_CLUSTER"
Write-Host "Namespace: $NAMESPACE"

# Check if Azure CLI is logged in
Write-Host "`n🔐 Checking Azure authentication..." -ForegroundColor Yellow
$azAccount = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged into Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Azure authentication confirmed" -ForegroundColor Green

# Get AKS credentials
Write-Host "`n☸️  Getting AKS credentials..." -ForegroundColor Yellow
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to get AKS credentials" -ForegroundColor Red
    exit 1
}
Write-Host "✅ AKS credentials obtained" -ForegroundColor Green

# Create namespace if it doesn't exist
Write-Host "`n📦 Creating namespace..." -ForegroundColor Yellow
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -
Write-Host "✅ Namespace $NAMESPACE ready" -ForegroundColor Green

# Create database secrets
Write-Host "`n🔑 Creating database secrets..." -ForegroundColor Yellow
kubectl create secret generic pci-postgres-secrets `
  --namespace=$NAMESPACE `
  --from-literal=postgres-user="pci" `
  --from-literal=postgres-password="pciwebsite@123" `
  --dry-run=client -o yaml | kubectl apply -f -
Write-Host "✅ Database secrets created" -ForegroundColor Green

# Deploy PostgreSQL StatefulSet
Write-Host "`n🗄️  Deploying PostgreSQL database..." -ForegroundColor Yellow
kubectl apply -f k8s/base/postgres-statefulset.yaml --namespace=$NAMESPACE
kubectl apply -f k8s/base/postgres-service.yaml --namespace=$NAMESPACE

# Wait for database to be ready
Write-Host "`n⏳ Waiting for database to be ready..." -ForegroundColor Yellow
kubectl wait --for=condition=ready pod -l app=pci-postgres -n $NAMESPACE --timeout=300s

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PostgreSQL database is ready!" -ForegroundColor Green
} else {
    Write-Host "❌ Database failed to start within timeout" -ForegroundColor Red
    Write-Host "Checking pod status..." -ForegroundColor Yellow
    kubectl get pods -n $NAMESPACE -l app=pci-postgres
    exit 1
}

# Check database status
Write-Host "`n📊 Database Status:" -ForegroundColor Cyan
kubectl get pods -n $NAMESPACE -l app=pci-postgres
kubectl get services -n $NAMESPACE -l app=pci-postgres

Write-Host "`n🎉 Staging Database Setup Complete! 🎉" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Database: pci-postgres.pci-staging.svc.cluster.local:5432"
Write-Host "Username: pci"
Write-Host "Password: pciwebsite@123"
Write-Host "Database Name: pci"
Write-Host "`nYou can now run the staging deployment workflow!" -ForegroundColor Yellow
