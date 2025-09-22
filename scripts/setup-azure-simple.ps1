# Simplified Azure AKS Setup Script for PCI Production
# This script creates Azure resources step by step to avoid parameter issues

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "PCI-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "centralindia",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "pci-aks-cluster",
    
    [Parameter(Mandatory=$false)]
    [string]$ACRName = "pciregistry"
)

$ErrorActionPreference = "Stop"

Write-Host "Starting simplified Azure setup for Paralympic Committee of India..." -ForegroundColor Green

# Check if logged in to Azure
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Azure first using 'az login'" -ForegroundColor Red
    exit 1
}

Write-Host "Using Azure subscription: $((az account show --query name -o tsv))" -ForegroundColor Cyan

# Step 1: Create Resource Group
Write-Host "`n=== Step 1: Creating Resource Group ===" -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create resource group" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Resource group created successfully" -ForegroundColor Green

# Step 2: Create Azure Container Registry
Write-Host "`n=== Step 2: Creating Azure Container Registry ===" -ForegroundColor Yellow
az acr create `
    --resource-group $ResourceGroup `
    --name $ACRName `
    --sku Standard `
    --location $Location `
    --admin-enabled true

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create ACR" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Azure Container Registry created successfully" -ForegroundColor Green

# Step 3: Create AKS Cluster (Simplified)
Write-Host "`n=== Step 3: Creating AKS Cluster (Simplified) ===" -ForegroundColor Yellow
Write-Host "This will take 5-10 minutes..." -ForegroundColor Cyan

az aks create `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --location $Location `
    --node-count 3 `
    --node-vm-size Standard_D2s_v3 `
    --generate-ssh-keys `
    --enable-managed-identity

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create AKS cluster with simplified settings" -ForegroundColor Red
    Write-Host "Trying with minimal settings..." -ForegroundColor Yellow
    
    # Try with absolute minimal settings
    az aks create `
        --resource-group $ResourceGroup `
        --name $AKSClusterName `
        --location $Location `
        --node-count 2 `
        --generate-ssh-keys
        
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create AKS cluster. Please check Azure quotas and permissions." -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ AKS Cluster created successfully" -ForegroundColor Green

# Step 4: Attach ACR to AKS
Write-Host "`n=== Step 4: Attaching ACR to AKS ===" -ForegroundColor Yellow
az aks update `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --attach-acr $ACRName

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to attach ACR to AKS" -ForegroundColor Red
    exit 1
}
Write-Host "✅ ACR attached to AKS successfully" -ForegroundColor Green

# Step 5: Get AKS credentials
Write-Host "`n=== Step 5: Getting AKS credentials ===" -ForegroundColor Yellow
az aks get-credentials `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --overwrite-existing

Write-Host "✅ AKS credentials configured" -ForegroundColor Green

# Step 6: Install NGINX Ingress Controller
Write-Host "`n=== Step 6: Installing NGINX Ingress Controller ===" -ForegroundColor Yellow

# Create namespace
kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -

# Install NGINX ingress using kubectl (more reliable than Helm)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

Write-Host "✅ NGINX Ingress Controller installed" -ForegroundColor Green

# Step 7: Install cert-manager
Write-Host "`n=== Step 7: Installing cert-manager ===" -ForegroundColor Yellow
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.3/cert-manager.yaml

Write-Host "✅ cert-manager installed" -ForegroundColor Green

# Step 8: Create application namespace
Write-Host "`n=== Step 8: Creating application namespace ===" -ForegroundColor Yellow
kubectl create namespace pci-prod --dry-run=client -o yaml | kubectl apply -f -

Write-Host "✅ Application namespace created" -ForegroundColor Green

# Step 9: Create ACR secret
Write-Host "`n=== Step 9: Creating ACR secret ===" -ForegroundColor Yellow
$acrUsername = az acr credential show --name $ACRName --query username -o tsv
$acrPassword = az acr credential show --name $ACRName --query passwords[0].value -o tsv

kubectl create secret docker-registry acr-secret `
    --namespace pci-prod `
    --docker-server="$ACRName.azurecr.io" `
    --docker-username=$acrUsername `
    --docker-password=$acrPassword `
    --dry-run=client -o yaml | kubectl apply -f -

Write-Host "✅ ACR secret created" -ForegroundColor Green

# Final Summary
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "🏆 Paralympic Committee of India - Azure Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "Location: $Location (Central India)" -ForegroundColor Cyan
Write-Host "AKS Cluster: $AKSClusterName" -ForegroundColor Cyan
Write-Host "ACR Registry: $ACRName.azurecr.io" -ForegroundColor Cyan
Write-Host "ACR Username: $acrUsername" -ForegroundColor Cyan

Write-Host "`n🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run: .\scripts\build-and-push.ps1" -ForegroundColor White
Write-Host "2. Run: .\scripts\deploy-to-aks.ps1 -Environment production" -ForegroundColor White
Write-Host "3. Configure DNS for www.paralympicindia.com" -ForegroundColor White

Write-Host "`n✅ Ready for Paralympic Committee of India deployment!" -ForegroundColor Green
