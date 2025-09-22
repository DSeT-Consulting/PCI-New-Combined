# Deploy PCI Application to Azure AKS
# This script deploys the application to either staging or production environment

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("staging", "production")]
    [string]$Environment,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "",
    
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipSecrets = $false
)

$ErrorActionPreference = "Stop"

# Set environment-specific values
if ($Environment -eq "staging") {
    if (-not $ResourceGroup) { $ResourceGroup = "PCI" }
    if (-not $AKSClusterName) { $AKSClusterName = "pci-staging-aks" }
    $namespace = "pci-staging"
} else {
    if (-not $ResourceGroup) { $ResourceGroup = "PCI-prod" }
    if (-not $AKSClusterName) { $AKSClusterName = "pci-production-aks" }
    $namespace = "pci-production"
}

Write-Host "🏆 Deploying Paralympic Committee of India to $Environment" -ForegroundColor Green
Write-Host "Cluster: $AKSClusterName" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "Namespace: $namespace" -ForegroundColor Cyan

# Get AKS credentials
Write-Host "`nGetting AKS credentials..." -ForegroundColor Yellow
az aks get-credentials --resource-group $ResourceGroup --name $AKSClusterName --overwrite-existing

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to get AKS credentials" -ForegroundColor Red
    exit 1
}

# Namespace already set above

# Create namespace if it doesn't exist
Write-Host "`nCreating namespace: $namespace..." -ForegroundColor Yellow
kubectl create namespace $namespace --dry-run=client -o yaml | kubectl apply -f -

# Create secrets if not skipping
if (-not $SkipSecrets) {
    Write-Host "`nCreating Kubernetes secrets..." -ForegroundColor Yellow
    
    # Prompt for secrets if not in environment
    if (-not $env:POSTGRES_USER) {
        $env:POSTGRES_USER = Read-Host "Enter PostgreSQL username"
    }
    if (-not $env:POSTGRES_PASSWORD) {
        $postgresPassword = Read-Host "Enter PostgreSQL password" -AsSecureString
        $env:POSTGRES_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($postgresPassword))
    }
    if (-not $env:DATABASE_URL) {
        $env:DATABASE_URL = "postgresql://$($env:POSTGRES_USER):$($env:POSTGRES_PASSWORD)@pci-postgres:5432/pci"
    }
    if (-not $env:NEXTAUTH_SECRET) {
        $nextAuthSecret = Read-Host "Enter NextAuth secret" -AsSecureString
        $env:NEXTAUTH_SECRET = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($nextAuthSecret))
    }
    
    # Create PostgreSQL secrets
    kubectl create secret generic pci-postgres-secrets `
        --namespace=$namespace `
        --from-literal=postgres-user=$env:POSTGRES_USER `
        --from-literal=postgres-password=$env:POSTGRES_PASSWORD `
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Create backend secrets
    kubectl create secret generic pci-backend-secrets `
        --namespace=$namespace `
        --from-literal=database-url=$env:DATABASE_URL `
        --dry-run=client -o yaml | kubectl apply -f -
    
    # Create frontend secrets
    kubectl create secret generic pci-frontend-secrets `
        --namespace=$namespace `
        --from-literal=nextauth-secret=$env:NEXTAUTH_SECRET `
        --from-literal=database-url=$env:DATABASE_URL `
        --dry-run=client -o yaml | kubectl apply -f -
    
    Write-Host "Secrets created successfully!" -ForegroundColor Green
}

# Update image tags if not latest
if ($ImageTag -ne "latest") {
    Write-Host "`nUpdating image tags to: $ImageTag..." -ForegroundColor Yellow
    
    # Create temporary kustomization file
    $kustomizationPath = "k8s/overlays/$Environment/kustomization.yaml"
    $tempKustomization = Get-Content $kustomizationPath
    $tempKustomization = $tempKustomization -replace "newTag: latest", "newTag: $ImageTag"
    $tempKustomization | Set-Content "$kustomizationPath.tmp"
    
    # Use temporary file for deployment
    Move-Item "$kustomizationPath.tmp" $kustomizationPath
}

# Deploy using Kustomize
Write-Host "`nDeploying to Kubernetes..." -ForegroundColor Yellow
kubectl apply -k "k8s/overlays/$Environment" --namespace=$namespace

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to deploy to Kubernetes" -ForegroundColor Red
    exit 1
}

# Wait for deployments to be ready
Write-Host "`nWaiting for deployments to be ready..." -ForegroundColor Yellow

$deployments = @("pci-backend", "pci-frontend")
foreach ($deployment in $deployments) {
    Write-Host "Waiting for $deployment..." -ForegroundColor Cyan
    kubectl rollout status deployment/$deployment --namespace=$namespace --timeout=300s
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Deployment $deployment failed or timed out" -ForegroundColor Red
        exit 1
    }
}

# Wait for PostgreSQL StatefulSet
Write-Host "Waiting for PostgreSQL..." -ForegroundColor Cyan
kubectl rollout status statefulset/pci-postgres --namespace=$namespace --timeout=300s

if ($LASTEXITCODE -ne 0) {
    Write-Host "PostgreSQL deployment failed or timed out" -ForegroundColor Red
    exit 1
}

# Run database migrations
Write-Host "`nRunning database migrations..." -ForegroundColor Yellow
$backendPod = kubectl get pods -n $namespace -l app=pci-backend -o jsonpath='{.items[0].metadata.name}'

if ($backendPod) {
    kubectl exec -n $namespace $backendPod -- npm run drizzle:migrate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database migrations completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "Database migrations failed" -ForegroundColor Yellow
    }
} else {
    Write-Host "Could not find backend pod for migrations" -ForegroundColor Yellow
}

# Get service information
Write-Host "`nGetting service information..." -ForegroundColor Yellow
kubectl get services --namespace=$namespace
kubectl get ingress --namespace=$namespace

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Deployment to $Environment completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Namespace: $namespace" -ForegroundColor Cyan
Write-Host "Environment: $Environment" -ForegroundColor Cyan

if ($Environment -eq "production") {
    Write-Host "`nProduction deployment notes:" -ForegroundColor Yellow
    Write-Host "1. Update DNS records to point to the ingress IP" -ForegroundColor White
    Write-Host "2. Update domain names in configmaps if needed" -ForegroundColor White
    Write-Host "3. Monitor application logs and metrics" -ForegroundColor White
}
