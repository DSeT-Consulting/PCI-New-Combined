# Cleanup PCI Application Deployment
# This script removes the application from AKS or deletes Azure resources

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("app-only", "full-cleanup")]
    [string]$CleanupType,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("staging", "production", "both")]
    [string]$Environment = "both",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "PCI-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$AKSClusterName = "pci-aks-cluster",
    
    [Parameter(Mandatory=$false)]
    [string]$ACRName = "pciregistry",
    
    [Parameter(Mandatory=$false)]
    [switch]$Force = $false
)

$ErrorActionPreference = "Stop"

if (-not $Force) {
    Write-Host "WARNING: This will delete resources permanently!" -ForegroundColor Red
    $confirm = Read-Host "Are you sure you want to proceed? (yes/no)"
    if ($confirm -ne "yes") {
        Write-Host "Operation cancelled." -ForegroundColor Yellow
        exit 0
    }
}

if ($CleanupType -eq "app-only") {
    Write-Host "Removing PCI application from AKS..." -ForegroundColor Yellow
    
    # Get AKS credentials
    az aks get-credentials --resource-group $ResourceGroup --name $AKSClusterName --overwrite-existing
    
    # Remove application based on environment
    if ($Environment -eq "staging" -or $Environment -eq "both") {
        Write-Host "Removing staging environment..." -ForegroundColor Cyan
        kubectl delete namespace pci-staging --ignore-not-found=true
    }
    
    if ($Environment -eq "production" -or $Environment -eq "both") {
        Write-Host "Removing production environment..." -ForegroundColor Cyan
        kubectl delete namespace pci-prod --ignore-not-found=true
    }
    
    Write-Host "Application cleanup completed!" -ForegroundColor Green
}
elseif ($CleanupType -eq "full-cleanup") {
    Write-Host "Performing full cleanup of Azure resources..." -ForegroundColor Yellow
    
    # Delete the entire resource group (this will delete everything)
    Write-Host "Deleting resource group: $ResourceGroup..." -ForegroundColor Red
    Write-Host "This will delete ALL resources in the resource group including AKS, ACR, and storage!" -ForegroundColor Red
    
    if (-not $Force) {
        $finalConfirm = Read-Host "Type 'DELETE' to confirm full resource group deletion"
        if ($finalConfirm -ne "DELETE") {
            Write-Host "Operation cancelled." -ForegroundColor Yellow
            exit 0
        }
    }
    
    az group delete --name $ResourceGroup --yes --no-wait
    
    Write-Host "Resource group deletion initiated. This will take several minutes to complete." -ForegroundColor Green
    Write-Host "You can check the status in the Azure portal." -ForegroundColor Cyan
}

Write-Host "`nCleanup operation completed!" -ForegroundColor Green
