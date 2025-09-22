#!/usr/bin/env pwsh

# Build Production Images for Paralympic Committee of India
# This script builds Docker images with production configuration

Write-Host "🏗️  Building Paralympic Committee of India Production Images..." -ForegroundColor Green

# Set production environment variables
$PRODUCTION_DOMAIN = "https://www.paralympicindia.com"
$PRODUCTION_ACR = "pciregistry.azurecr.io"

Write-Host "🔧 Production Configuration:" -ForegroundColor Yellow
Write-Host "  Domain: $PRODUCTION_DOMAIN" -ForegroundColor Cyan
Write-Host "  Registry: $PRODUCTION_ACR" -ForegroundColor Cyan

# Build Frontend with production environment variables
Write-Host "`n📦 Building Frontend for Production..." -ForegroundColor Green
Set-Location "PCI"
docker build --no-cache `
  --build-arg NEXT_PUBLIC_BACKEND_URL="$PRODUCTION_DOMAIN" `
  --build-arg NEXT_PUBLIC_API_URL="/api" `
  -t "$PRODUCTION_ACR/pci-frontend:latest" `
  .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

# Build Backend
Write-Host "`n📦 Building Backend for Production..." -ForegroundColor Green
Set-Location "../PCI-backend"
docker build -t "$PRODUCTION_ACR/pci-backend:latest" .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Backend build failed!" -ForegroundColor Red
    exit 1
}

Set-Location ".."

Write-Host "`n🚀 Ready to push to production registry!" -ForegroundColor Green
Write-Host "To push images, run:" -ForegroundColor Yellow
Write-Host "  docker push $PRODUCTION_ACR/pci-frontend:latest" -ForegroundColor Cyan
Write-Host "  docker push $PRODUCTION_ACR/pci-backend:latest" -ForegroundColor Cyan

Write-Host "`n🏆 Paralympic Committee of India Production Images Built Successfully!" -ForegroundColor Green
