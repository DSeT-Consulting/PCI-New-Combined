# Setup Temporary Domains for Paralympic Committee of India
# This allows testing before switching the real domain

param(
    [Parameter(Mandatory=$false)]
    [string]$TempDomain = "pci-temp-prod.eastus.cloudapp.azure.com"
)

Write-Host "🏆 Setting up temporary domains for Paralympic Committee of India" -ForegroundColor Green
Write-Host "This allows you to test before switching the real domain tomorrow" -ForegroundColor Cyan

# Update production configs to use temporary domain
Write-Host "`nUpdating production configurations with temporary domain..." -ForegroundColor Yellow

# Update backend config
$backendConfigFile = "k8s\overlays\production\backend-configmap-patch.yaml"
(Get-Content $backendConfigFile) -replace "https://www.paralympicindia.com", "https://$TempDomain" | Set-Content $backendConfigFile

# Update frontend config  
$frontendConfigFile = "k8s\overlays\production\frontend-configmap-patch.yaml"
(Get-Content $frontendConfigFile) -replace "https://www.paralympicindia.com", "https://$TempDomain" | Set-Content $frontendConfigFile

# Update ingress
$ingressFile = "k8s\base\ingress.yaml"
(Get-Content $ingressFile) -replace "www.paralympicindia.com", $TempDomain | Set-Content $ingressFile

# Update cert issuer (disable Let's Encrypt for temp domain)
$certFile = "k8s\overlays\production\cert-issuer.yaml"
$content = Get-Content $certFile
$content = $content -replace "letsencrypt-prod", "letsencrypt-staging"
$content = $content -replace "https://acme-v02.api.letsencrypt.org/directory", "https://acme-staging-v02.api.letsencrypt.org/directory"
$content | Set-Content $certFile

Write-Host "✅ Configurations updated for temporary domain" -ForegroundColor Green

Write-Host "`n📋 Current Setup:" -ForegroundColor Cyan
Write-Host "Temporary Production URL: https://$TempDomain" -ForegroundColor White
Write-Host "Staging URL: https://staging.paralympicindia.com (unchanged)" -ForegroundColor White

Write-Host "`n🔄 To switch to real domain tomorrow:" -ForegroundColor Yellow
Write-Host "1. Run: .\scripts\switch-to-real-domain.ps1" -ForegroundColor White
Write-Host "2. Update DNS records to point to AKS ingress IP" -ForegroundColor White
Write-Host "3. SSL certificates will auto-generate for real domain" -ForegroundColor White

Write-Host "`n🚀 Ready for deployment with temporary domain!" -ForegroundColor Green
