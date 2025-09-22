# Azure AKS and ACR Setup Script for PCI Production
# Run this script with appropriate Azure credentials

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "PCI-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "centralindia",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "pci-aks-cluster",
    
    [Parameter(Mandatory=$false)]
    [string]$ACRName = "pciregistry",
    
    [Parameter(Mandatory=$false)]
    [string]$NodeCount = "3",
    
    [Parameter(Mandatory=$false)]
    [string]$NodeSize = "Standard_D2s_v3"
)

Write-Host "Starting Azure resources setup for PCI production environment..." -ForegroundColor Green

# Check if logged in to Azure
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Azure first using 'az login'" -ForegroundColor Red
    exit 1
}

Write-Host "Using Azure subscription: $((az account show --query name -o tsv))" -ForegroundColor Cyan

# Create Resource Group
Write-Host "`nCreating Resource Group: $ResourceGroup in $Location..." -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create resource group" -ForegroundColor Red
    exit 1
}

# Create Azure Container Registry
Write-Host "`nCreating Azure Container Registry: $ACRName..." -ForegroundColor Yellow
az acr create `
    --resource-group $ResourceGroup `
    --name $ACRName `
    --sku Premium `
    --location $Location `
    --admin-enabled true

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create ACR" -ForegroundColor Red
    exit 1
}

# Create AKS Cluster
Write-Host "`nCreating AKS Cluster: $AKSClusterName..." -ForegroundColor Yellow
Write-Host "This may take 10-15 minutes..." -ForegroundColor Cyan

az aks create `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --location $Location `
    --node-count $NodeCount `
    --node-vm-size $NodeSize `
    --enable-managed-identity `
    --network-plugin azure `
    --network-policy azure `
    --enable-addons monitoring,azure-policy,ingress-appgw `
    --generate-ssh-keys `
    --attach-acr $ACRName `
    --enable-cluster-autoscaler `
    --min-count 3 `
    --max-count 10 `
    --kubernetes-version 1.28.5

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create AKS cluster" -ForegroundColor Red
    exit 1
}

# Get AKS credentials
Write-Host "`nGetting AKS credentials..." -ForegroundColor Yellow
az aks get-credentials `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --overwrite-existing

# Install NGINX Ingress Controller
Write-Host "`nInstalling NGINX Ingress Controller..." -ForegroundColor Yellow
kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -

# Add the ingress-nginx repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Install NGINX ingress controller
helm install ingress-nginx ingress-nginx/ingress-nginx `
    --namespace ingress-nginx `
    --set controller.service.type=LoadBalancer `
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz

# Install cert-manager for SSL certificates
Write-Host "`nInstalling cert-manager..." -ForegroundColor Yellow
kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f -

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io
helm repo update

# Install cert-manager
helm install cert-manager jetstack/cert-manager `
    --namespace cert-manager `
    --version v1.13.3 `
    --set installCRDs=true

# Create namespaces
Write-Host "`nCreating application namespace..." -ForegroundColor Yellow
kubectl create namespace pci-prod --dry-run=client -o yaml | kubectl apply -f -

# Get ACR credentials
Write-Host "`nGetting ACR credentials..." -ForegroundColor Yellow
$acrUsername = az acr credential show --name $ACRName --query username -o tsv
$acrPassword = az acr credential show --name $ACRName --query passwords[0].value -o tsv

# Create Kubernetes secret for ACR
Write-Host "`nCreating Kubernetes secret for ACR..." -ForegroundColor Yellow
kubectl create secret docker-registry acr-secret `
    --namespace pci-prod `
    --docker-server="$ACRName.azurecr.io" `
    --docker-username=$acrUsername `
    --docker-password=$acrPassword

# Display summary
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Azure resources setup completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "AKS Cluster: $AKSClusterName" -ForegroundColor Cyan
Write-Host "ACR Registry: $ACRName.azurecr.io" -ForegroundColor Cyan
Write-Host "ACR Username: $acrUsername" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Build and push Docker images to ACR" -ForegroundColor White
Write-Host "2. Update Kubernetes manifests with your domain" -ForegroundColor White
Write-Host "3. Create secrets for database and application" -ForegroundColor White
Write-Host "4. Deploy the application using kubectl" -ForegroundColor White
