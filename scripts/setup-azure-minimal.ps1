# Minimal Azure AKS Setup for PCI - Troubleshooting Version
# This script creates AKS with absolute minimal parameters

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "PCI-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "southindia",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "pci-aks-minimal"
)

$ErrorActionPreference = "Continue"  # Continue on errors to see more details

Write-Host "Attempting minimal AKS creation for troubleshooting..." -ForegroundColor Green
Write-Host "Location: $Location" -ForegroundColor Cyan
Write-Host "Resource Group: $ResourceGroup" -ForegroundColor Cyan

# Test 1: Try creating with absolute minimal parameters
Write-Host "`n=== Test 1: Minimal AKS Creation ===" -ForegroundColor Yellow

$command = @"
az aks create \
--resource-group $ResourceGroup \
--name $AKSClusterName \
--location $Location \
--node-count 1 \
--generate-ssh-keys \
--yes
"@

Write-Host "Command: $command" -ForegroundColor Gray
Invoke-Expression $command

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Minimal AKS creation successful!" -ForegroundColor Green
    
    # Get credentials
    az aks get-credentials --resource-group $ResourceGroup --name $AKSClusterName --overwrite-existing
    
    # Test kubectl
    kubectl get nodes
    
    exit 0
} else {
    Write-Host "❌ Minimal AKS creation failed" -ForegroundColor Red
}

# Test 2: Try with different node VM size
Write-Host "`n=== Test 2: Different VM Size ===" -ForegroundColor Yellow
$AKSClusterName2 = "pci-aks-test2"

az aks create `
    --resource-group $ResourceGroup `
    --name $AKSClusterName2 `
    --location $Location `
    --node-count 1 `
    --node-vm-size Standard_B2s `
    --generate-ssh-keys `
    --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ AKS with Standard_B2s successful!" -ForegroundColor Green
    az aks get-credentials --resource-group $ResourceGroup --name $AKSClusterName2 --overwrite-existing
    kubectl get nodes
    exit 0
} else {
    Write-Host "❌ AKS with Standard_B2s failed" -ForegroundColor Red
}

# Test 3: Check available Kubernetes versions
Write-Host "`n=== Test 3: Check Available Kubernetes Versions ===" -ForegroundColor Yellow
az aks get-versions --location $Location --output table

Write-Host "`n=== Diagnostics Complete ===" -ForegroundColor Yellow
Write-Host "If all tests failed, this might be a subscription or region limitation." -ForegroundColor Red
Write-Host "Consider:" -ForegroundColor Yellow
Write-Host "1. Trying a different Azure region" -ForegroundColor White
Write-Host "2. Checking with Azure support about subscription limits" -ForegroundColor White
Write-Host "3. Using Azure Container Instances as an alternative" -ForegroundColor White
