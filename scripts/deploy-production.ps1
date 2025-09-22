#!/usr/bin/env pwsh

# Deploy Paralympic Committee of India to Production
# This script deploys the working configuration to production environment

Write-Host "🏆 Deploying Paralympic Committee of India to Production..." -ForegroundColor Green

# Check if we're connected to production cluster
$currentContext = kubectl config current-context
Write-Host "Current cluster context: $currentContext" -ForegroundColor Cyan

if ($currentContext -ne "pci-production-aks") {
    Write-Host "⚠️  Switching to production cluster..." -ForegroundColor Yellow
    kubectl config use-context pci-production-aks
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to switch to production cluster!" -ForegroundColor Red
        Write-Host "Make sure the production cluster is accessible." -ForegroundColor Yellow
        exit 1
    }
}

# Verify cluster connectivity
Write-Host "🔍 Verifying production cluster connectivity..." -ForegroundColor Green
$nodes = kubectl get nodes --no-headers 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Cannot connect to production cluster!" -ForegroundColor Red
    Write-Host "Please ensure the production cluster is running and accessible." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Connected to production cluster" -ForegroundColor Green
Write-Host "Nodes: $($nodes.Count)" -ForegroundColor Cyan

# Create namespace if it doesn't exist
Write-Host "`n📁 Ensuring production namespace exists..." -ForegroundColor Green
kubectl create namespace pci-production --dry-run=client -o yaml | kubectl apply -f -

# Deploy to production using kustomize
Write-Host "`n🚀 Deploying Paralympic Committee of India to Production..." -ForegroundColor Green
kubectl apply -k k8s/overlays/production

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

# Wait for deployments to be ready
Write-Host "`n⏳ Waiting for deployments to be ready..." -ForegroundColor Green
kubectl wait --for=condition=available deployment --all -n pci-production --timeout=300s

# Get ingress IP
Write-Host "`n🌐 Getting production ingress information..." -ForegroundColor Green
$ingress = kubectl get ingress -n pci-production -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}' 2>$null

if ($ingress) {
    Write-Host "✅ Production site accessible at: http://$ingress" -ForegroundColor Green
    Write-Host "🏆 Paralympic Committee of India Production Deployment Complete!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Ingress IP not yet assigned. Check status with:" -ForegroundColor Yellow
    Write-Host "  kubectl get ingress -n pci-production" -ForegroundColor Cyan
}

Write-Host "`n📊 Production Status:" -ForegroundColor Yellow
kubectl get pods,services,ingress -n pci-production
