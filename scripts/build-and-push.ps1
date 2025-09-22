# Build and Push Docker Images to Azure Container Registry
# This script builds both frontend and backend images and pushes them to ACR

param(
    [Parameter(Mandatory=$false)]
    [string]$ACRName = "pciregistry",
    
    [Parameter(Mandatory=$false)]
    [string]$Tag = "latest",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild = $false,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipPush = $false
)

$ErrorActionPreference = "Stop"

Write-Host "Starting Docker build and push process..." -ForegroundColor Green

# Login to ACR
Write-Host "`nLogging in to Azure Container Registry..." -ForegroundColor Yellow
az acr login --name $ACRName

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to login to ACR. Make sure you're logged in to Azure." -ForegroundColor Red
    exit 1
}

$acrUrl = "$ACRName.azurecr.io"

# Build Backend
if (-not $SkipBuild) {
    Write-Host "`nBuilding Backend Docker image..." -ForegroundColor Yellow
    Set-Location -Path ".\PCI-backend"
    
    docker build -t "$acrUrl/pci-backend:$Tag" .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to build backend image" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Backend image built successfully!" -ForegroundColor Green
    Set-Location -Path ".."
}

# Build Frontend
if (-not $SkipBuild) {
    Write-Host "`nBuilding Frontend Docker image..." -ForegroundColor Yellow
    Set-Location -Path ".\PCI"
    
    docker build -t "$acrUrl/pci-frontend:$Tag" .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to build frontend image" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Frontend image built successfully!" -ForegroundColor Green
    Set-Location -Path ".."
}

# Push images to ACR
if (-not $SkipPush) {
    Write-Host "`nPushing Backend image to ACR..." -ForegroundColor Yellow
    docker push "$acrUrl/pci-backend:$Tag"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to push backend image" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "`nPushing Frontend image to ACR..." -ForegroundColor Yellow
    docker push "$acrUrl/pci-frontend:$Tag"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to push frontend image" -ForegroundColor Red
        exit 1
    }
}

# Tag images with additional tags if building latest
if ($Tag -eq "latest" -and -not $SkipBuild) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    
    Write-Host "`nTagging images with timestamp: $timestamp" -ForegroundColor Yellow
    
    docker tag "$acrUrl/pci-backend:latest" "$acrUrl/pci-backend:$timestamp"
    docker tag "$acrUrl/pci-frontend:latest" "$acrUrl/pci-frontend:$timestamp"
    
    if (-not $SkipPush) {
        docker push "$acrUrl/pci-backend:$timestamp"
        docker push "$acrUrl/pci-frontend:$timestamp"
    }
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Build and push completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend image: $acrUrl/pci-backend:$Tag" -ForegroundColor Cyan
Write-Host "Frontend image: $acrUrl/pci-frontend:$Tag" -ForegroundColor Cyan

if ($Tag -eq "latest") {
    Write-Host "`nImages also tagged with: $timestamp" -ForegroundColor Cyan
}
