# Test Staging Deployment Script
# This script helps verify that your staging deployment is properly configured

Write-Host "🏆 PCI Staging Deployment Test Script 🏆" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path ".github/workflows/ci-cd-staging.yml")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found staging workflow file" -ForegroundColor Green

# Check if required files exist
$requiredFiles = @(
    "PCI/package.json",
    "PCI-backend/package.json",
    "k8s/overlays/staging/kustomization.yaml",
    "k8s/base/kustomization.yaml"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing $file" -ForegroundColor Red
    }
}

# Check Dockerfiles
$dockerFiles = @(
    "PCI/Dockerfile",
    "PCI-backend/Dockerfile"
)

foreach ($file in $dockerFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing $file" -ForegroundColor Red
    }
}

# Check if git is initialized
if (Test-Path ".git") {
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    
    # Check current branch
    $currentBranch = git branch --show-current
    Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Yellow
    
    # Check if we have commits
    $commitCount = (git rev-list --count HEAD)
    if ($commitCount -gt 0) {
        Write-Host "✅ Repository has $commitCount commits" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Repository has no commits yet" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Git repository not initialized" -ForegroundColor Red
}

# Check package.json scripts
Write-Host "`n📦 Checking package.json scripts..." -ForegroundColor Cyan

if (Test-Path "PCI/package.json") {
    $frontendPackage = Get-Content "PCI/package.json" | ConvertFrom-Json
    $requiredScripts = @("build", "dev", "start")
    
    foreach ($script in $requiredScripts) {
        if ($frontendPackage.scripts.$script) {
            Write-Host "✅ Frontend has '$script' script" -ForegroundColor Green
        } else {
            Write-Host "❌ Frontend missing '$script' script" -ForegroundColor Red
        }
    }
}

if (Test-Path "PCI-backend/package.json") {
    $backendPackage = Get-Content "PCI-backend/package.json" | ConvertFrom-Json
    $requiredScripts = @("build", "start", "test")
    
    foreach ($script in $requiredScripts) {
        if ($backendPackage.scripts.$script) {
            Write-Host "✅ Backend has '$script' script" -ForegroundColor Green
        } else {
            Write-Host "❌ Backend missing '$script' script" -ForegroundColor Red
        }
    }
}

# Check Kubernetes configuration
Write-Host "`n☸️  Checking Kubernetes configuration..." -ForegroundColor Cyan

if (Test-Path "k8s/overlays/staging/kustomization.yaml") {
    $stagingKustomization = Get-Content "k8s/overlays/staging/kustomization.yaml"
    
    if ($stagingKustomization -match "namespace: pci-staging") {
        Write-Host "✅ Staging namespace configured correctly" -ForegroundColor Green
    } else {
        Write-Host "❌ Staging namespace not configured" -ForegroundColor Red
    }
    
    if ($stagingKustomization -match "pcistaging.azurecr.io") {
        Write-Host "✅ Staging ACR configured correctly" -ForegroundColor Green
    } else {
        Write-Host "❌ Staging ACR not configured" -ForegroundColor Red
    }
}

# Summary
Write-Host "`n📋 Summary:" -ForegroundColor Cyan
Write-Host "===========" -ForegroundColor Cyan

Write-Host "`n🚀 To deploy to staging:" -ForegroundColor Yellow
Write-Host "1. Ensure all GitHub secrets are configured (see GITHUB-SECRETS-SETUP.md)" -ForegroundColor White
Write-Host "2. Push code to develop, staging, or main branch:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Your commit message'" -ForegroundColor Gray
Write-Host "   git push origin develop" -ForegroundColor Gray
Write-Host "3. Monitor deployment in GitHub Actions tab" -ForegroundColor White

Write-Host "`n🔧 Manual deployment:" -ForegroundColor Yellow
Write-Host "1. Go to GitHub repository → Actions tab" -ForegroundColor White
Write-Host "2. Select 'CI/CD - Staging Deployment'" -ForegroundColor White
Write-Host "3. Click 'Run workflow'" -ForegroundColor White

Write-Host "`n📚 Documentation:" -ForegroundColor Yellow
Write-Host "- GITHUB-SECRETS-SETUP.md: Configure required secrets" -ForegroundColor White
Write-Host "- STAGING-DEPLOYMENT-GUIDE.md: Detailed deployment guide" -ForegroundColor White

Write-Host "`n🏆 Test completed! Check the results above." -ForegroundColor Green
