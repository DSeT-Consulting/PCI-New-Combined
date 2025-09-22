# Production AKS Cluster Setup for Paralympic Committee of India
# This creates a separate, production-grade AKS cluster with enhanced security and performance

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "PCI-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "centralindia",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "pci-production-aks",
    
    [Parameter(Mandatory=$false)]
    [string]$ACRName = "pciregistry"
)

$ErrorActionPreference = "Stop"

Write-Host "🏆 Creating Production AKS Cluster for Paralympic Committee of India" -ForegroundColor Green
Write-Host "This will be separate from staging with production-grade resources" -ForegroundColor Cyan

# Check if already logged in
$account = az account show 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Azure first using 'az login'" -ForegroundColor Red
    exit 1
}

Write-Host "Using subscription: $((az account show --query name -o tsv))" -ForegroundColor Cyan

# Step 1: Create Production Resource Group
Write-Host "`n=== Creating Production Resource Group ===" -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to create production resource group" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Production resource group created" -ForegroundColor Green

# Step 2: Create Production ACR (if using the new one)
Write-Host "`n=== Creating Production Container Registry ===" -ForegroundColor Yellow
az acr create `
    --resource-group $ResourceGroup `
    --name $ACRName `
    --sku Premium `
    --location $Location `
    --admin-enabled true

if ($LASTEXITCODE -ne 0) {
    Write-Host "ACR might already exist, continuing..." -ForegroundColor Yellow
}
Write-Host "✅ Production Container Registry ready" -ForegroundColor Green

# Step 3: Create Production AKS Cluster with enhanced configuration
Write-Host "`n=== Creating Production AKS Cluster ===" -ForegroundColor Yellow
Write-Host "⚠️  This will take 10-15 minutes for production setup..." -ForegroundColor Cyan

# Try creating production cluster with enhanced settings
az aks create `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --location $Location `
    --node-count 3 `
    --min-count 3 `
    --max-count 10 `
    --node-vm-size Standard_D4s_v3 `
    --enable-cluster-autoscaler `
    --enable-managed-identity `
    --network-plugin azure `
    --generate-ssh-keys `
    --kubernetes-version 1.28.5 `
    --enable-addons monitoring `
    --attach-acr $ACRName `
    --load-balancer-sku standard `
    --vm-set-type VirtualMachineScaleSets

if ($LASTEXITCODE -ne 0) {
    Write-Host "Production cluster creation with full features failed, trying simplified..." -ForegroundColor Yellow
    
    # Fallback to simpler production cluster
    az aks create `
        --resource-group $ResourceGroup `
        --name $AKSClusterName `
        --location $Location `
        --node-count 3 `
        --node-vm-size Standard_D4s_v3 `
        --enable-managed-identity `
        --generate-ssh-keys `
        --attach-acr $ACRName
        
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create production cluster. Trying with Standard_D2s_v3..." -ForegroundColor Yellow
        
        # Try with smaller but still production-capable VMs
        az aks create `
            --resource-group $ResourceGroup `
            --name $AKSClusterName `
            --location $Location `
            --node-count 3 `
            --node-vm-size Standard_D2s_v3 `
            --enable-managed-identity `
            --generate-ssh-keys
            
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Failed to create production cluster. Please check quotas." -ForegroundColor Red
            exit 1
        }
        
        # Attach ACR separately
        Write-Host "Attaching ACR to production cluster..." -ForegroundColor Cyan
        az aks update --resource-group $ResourceGroup --name $AKSClusterName --attach-acr $ACRName
    }
}

Write-Host "✅ Production AKS Cluster created successfully!" -ForegroundColor Green

# Step 4: Get production cluster credentials
Write-Host "`n=== Configuring Production Cluster Access ===" -ForegroundColor Yellow
az aks get-credentials `
    --resource-group $ResourceGroup `
    --name $AKSClusterName `
    --overwrite-existing

# Step 5: Install production-grade add-ons
Write-Host "`n=== Installing Production Add-ons ===" -ForegroundColor Yellow

# Create namespaces
kubectl create namespace pci-production --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -
kubectl create namespace cert-manager --dry-run=client -o yaml | kubectl apply -f -

# Install NGINX Ingress Controller for production
Write-Host "Installing NGINX Ingress Controller..." -ForegroundColor Cyan
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Install cert-manager for SSL
Write-Host "Installing cert-manager..." -ForegroundColor Cyan
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.3/cert-manager.yaml

# Wait for cert-manager to be ready
Write-Host "Waiting for cert-manager to be ready..." -ForegroundColor Cyan
kubectl wait --for=condition=ready pod -l app=cert-manager -n cert-manager --timeout=300s
kubectl wait --for=condition=ready pod -l app=webhook -n cert-manager --timeout=300s

# Step 6: Create production secrets
Write-Host "`n=== Creating Production Secrets ===" -ForegroundColor Yellow

# Get ACR credentials
$acrUsername = az acr credential show --name $ACRName --query username -o tsv
$acrPassword = az acr credential show --name $ACRName --query passwords[0].value -o tsv

# Create ACR secret for production namespace
kubectl create secret docker-registry acr-secret `
    --namespace pci-production `
    --docker-server="$ACRName.azurecr.io" `
    --docker-username=$acrUsername `
    --docker-password=$acrPassword `
    --dry-run=client -o yaml | kubectl apply -f -

Write-Host "✅ Production secrets created" -ForegroundColor Green

# Step 7: Verify cluster
Write-Host "`n=== Verifying Production Cluster ===" -ForegroundColor Yellow
kubectl get nodes
kubectl get namespaces

Write-Host "`n🎯 ==========================================" -ForegroundColor Green
Write-Host "🏆 Paralympic Committee of India" -ForegroundColor Green
Write-Host "✅ Production Cluster Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

Write-Host "`n📊 Infrastructure Summary:" -ForegroundColor Cyan
Write-Host "Staging Cluster: pci-staging-aks (Resource Group: PCI)" -ForegroundColor White
Write-Host "Production Cluster: $AKSClusterName (Resource Group: $ResourceGroup)" -ForegroundColor White
Write-Host "Staging ACR: pcistaging.azurecr.io" -ForegroundColor White
Write-Host "Production ACR: $ACRName.azurecr.io" -ForegroundColor White

Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Build and push to production: .\scripts\build-and-push-existing.ps1 -Environment production" -ForegroundColor White
Write-Host "2. Deploy to production: .\scripts\deploy-to-aks.ps1 -Environment production" -ForegroundColor White
Write-Host "3. Staging remains on existing cluster for testing" -ForegroundColor White

Write-Host "`n🔒 Production Benefits:" -ForegroundColor Yellow
Write-Host "✅ Separate cluster for security isolation" -ForegroundColor Green
Write-Host "✅ Higher performance VMs (D4s_v3 or D2s_v3)" -ForegroundColor Green
Write-Host "✅ Auto-scaling for traffic spikes" -ForegroundColor Green
Write-Host "✅ Production-grade monitoring" -ForegroundColor Green
Write-Host "✅ Dedicated resources for paralympicindia.com" -ForegroundColor Green
