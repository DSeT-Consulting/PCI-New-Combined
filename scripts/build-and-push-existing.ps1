# Build and Push Paralympic Committee of India to Existing ACR
# This script uses your existing Azure infrastructure

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("staging", "production")]
    [string]$Environment = "staging",
    
    [Parameter(Mandatory=$false)]
    [string]$Tag = "latest"
)

$ErrorActionPreference = "Stop"

# Set ACR and cluster based on environment
if ($Environment -eq "staging") {
    $ACRName = "pcistaging"
    $ResourceGroup = "PCI"
    $ClusterName = "pci-staging-aks"
} else {
    $ACRName = "pciregistry"
    $ResourceGroup = "PCI-prod" 
    $ClusterName = "pci-production-aks"
}

$acrUrl = "$ACRName.azurecr.io"

Write-Host "🏆 Building Paralympic Committee of India Application" -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Cyan
Write-Host "ACR: $acrUrl" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Cyan

# Login to ACR
Write-Host "`n=== Logging in to Azure Container Registry ===" -ForegroundColor Yellow
az acr login --name $ACRName

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to login to ACR. Make sure you have access to $ACRName" -ForegroundColor Red
    exit 1
}

# Build Backend
Write-Host "`n=== Building PCI Backend Image ===" -ForegroundColor Yellow
Set-Location -Path ".\PCI-backend"

docker build -t "$acrUrl/pci-backend:$Tag" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build backend image" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend image built successfully!" -ForegroundColor Green
Set-Location -Path ".."

# Build Frontend
Write-Host "`n=== Building PCI Frontend Image ===" -ForegroundColor Yellow
Set-Location -Path ".\PCI"

docker build -t "$acrUrl/pci-frontend:$Tag" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build frontend image" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend image built successfully!" -ForegroundColor Green
Set-Location -Path ".."

# Push images to ACR
Write-Host "`n=== Pushing Images to ACR ===" -ForegroundColor Yellow

Write-Host "Pushing Backend image..." -ForegroundColor Cyan
docker push "$acrUrl/pci-backend:$Tag"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to push backend image" -ForegroundColor Red
    exit 1
}

Write-Host "Pushing Frontend image..." -ForegroundColor Cyan
docker push "$acrUrl/pci-frontend:$Tag"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to push frontend image" -ForegroundColor Red
    exit 1
}

# Tag with timestamp for versioning
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Write-Host "`nTagging images with timestamp: $timestamp" -ForegroundColor Yellow

docker tag "$acrUrl/pci-backend:$Tag" "$acrUrl/pci-backend:$timestamp"
docker tag "$acrUrl/pci-frontend:$Tag" "$acrUrl/pci-frontend:$timestamp"

docker push "$acrUrl/pci-backend:$timestamp"
docker push "$acrUrl/pci-frontend:$timestamp"

Write-Host "`n🎯 =================================" -ForegroundColor Green
Write-Host "🏆 Paralympic Committee of India" -ForegroundColor Green
Write-Host "✅ Build and Push Completed!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host "Backend: $acrUrl/pci-backend:$Tag" -ForegroundColor Cyan
Write-Host "Frontend: $acrUrl/pci-frontend:$Tag" -ForegroundColor Cyan
Write-Host "Timestamp: $timestamp" -ForegroundColor Cyan

Write-Host "`n🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "Run: .\scripts\deploy-to-aks.ps1 -Environment $Environment" -ForegroundColor White
