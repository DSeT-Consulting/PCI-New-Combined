# 🏅 Paralympic Committee of India - CI/CD Setup Guide

## Overview

This repository has automated CI/CD pipelines for both staging and production environments of the Paralympic Committee of India website.

## Pipeline Structure

### 🚀 Production Pipeline (`.github/workflows/deploy-production.yml`)
- **Trigger**: Push to `main` branch or manual dispatch
- **Target**: Production namespace in `pci-staging-aks` cluster
- **URL**: https://www.paralympicindia.com (via IP: 4.187.228.16)

### 🧪 Staging Pipeline (`.github/workflows/ci-cd-staging.yml`)  
- **Trigger**: Push to `develop`/`staging` branches
- **Target**: Staging namespace in `pci-staging-aks` cluster

## Required GitHub Secrets

You need to configure these secrets in your GitHub repository settings:

### Azure Authentication
```
AZURE_CREDENTIALS           # Service principal credentials for production ACR (pciregistry)
AZURE_CREDENTIALS_STAGING    # Service principal credentials for staging ACR (pcistaging)
```

### Database Configuration
```
POSTGRES_USER               # PostgreSQL username
POSTGRES_PASSWORD          # PostgreSQL password  
DATABASE_URL               # Production database connection string
DATABASE_URL_STAGING       # Staging database connection string
NEXTAUTH_SECRET           # NextAuth.js secret for authentication
```

## How to Set Up Azure Credentials

### 1. Create Service Principal for Production
```bash
az ad sp create-for-rbac \
  --name "pci-production-cicd" \
  --role "Contributor" \
  --scopes "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/PCI-prod" \
  --sdk-auth
```

### 2. Create Service Principal for Staging  
```bash
az ad sp create-for-rbac \
  --name "pci-staging-cicd" \
  --role "Contributor" \
  --scopes "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/PCI" \
  --sdk-auth
```

### 3. Add ACR Push Permissions
```bash
# For production ACR
az role assignment create \
  --assignee "SERVICE_PRINCIPAL_ID" \
  --role "AcrPush" \
  --scope "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/PCI-prod/providers/Microsoft.ContainerRegistry/registries/pciregistry"

# For staging ACR  
az role assignment create \
  --assignee "SERVICE_PRINCIPAL_ID" \
  --role "AcrPush" \
  --scope "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/PCI/providers/Microsoft.ContainerRegistry/registries/pcistaging"
```

## Current Environment Setup

### Production Environment
- **Cluster**: `pci-staging-aks` (PCI resource group)
- **Namespace**: `production`
- **Registry**: `pciregistry.azurecr.io`
- **Deployments**: `pci-backend-prod`, `pci-frontend-prod`
- **Domain**: https://www.paralympicindia.com
- **Load Balancer IP**: 4.187.228.16

### Staging Environment  
- **Cluster**: `pci-staging-aks` (PCI resource group)
- **Namespace**: `pci-staging`
- **Registry**: `pcistaging.azurecr.io`
- **Deployments**: `pci-backend`, `pci-frontend`

## Pipeline Features

### ✅ What the Production Pipeline Does:
1. **Builds Docker Images** with production environment variables
2. **Frontend**: Built with `NEXT_PUBLIC_BACKEND_URL=https://www.paralympicindia.com`
3. **Backend**: Includes all Paralympic images from `/uploads` directory
4. **Pushes to ACR**: Both commit SHA and latest tags
5. **Updates Deployments**: Uses `kubectl set image` for zero-downtime updates
6. **Waits for Rollout**: Ensures deployments complete successfully
7. **Verifies**: Checks pod status and provides deployment summary

### 🔧 Key Improvements Made:
- ✅ Uses correct cluster (`pci-staging-aks`) and namespace (`production`)
- ✅ Builds frontend with production URLs (no more localhost issues)
- ✅ Updates existing deployments instead of creating new ones
- ✅ Uses proper deployment names (`pci-*-prod`)
- ✅ Includes image uploads in backend build
- ✅ Extended timeout for large deployments (600s)

## Testing the Pipeline

### 1. Verify Secrets
Run the "Verify GitHub Secrets" workflow manually to check your configuration.

### 2. Manual Production Deployment
Go to GitHub Actions → "Deploy to Production" → "Run workflow" to test.

### 3. Automatic Deployment
Push to `main` branch to trigger automatic production deployment.

## Monitoring Deployments

### Check Pipeline Status
- View GitHub Actions tab for build/deploy logs
- Monitor pipeline execution and any failures

### Check Kubernetes Status
```bash
# Connect to cluster
az aks get-credentials --resource-group PCI --name pci-staging-aks

# Check production deployments  
kubectl get pods -n production
kubectl get deployments -n production

# Check rollout status
kubectl rollout status deployment/pci-backend-prod -n production
kubectl rollout status deployment/pci-frontend-prod -n production
```

### Test Website
- **Production**: https://www.paralympicindia.com
- **API**: https://www.paralympicindia.com/api/news
- **Direct IP**: http://4.187.228.16

## Troubleshooting

### Common Issues

1. **Secret Missing**: Check GitHub repository secrets configuration
2. **ACR Access**: Verify service principal has ACRPush role
3. **Cluster Access**: Ensure service principal can access AKS cluster
4. **Image Pull**: Check if ACR login succeeded and images were pushed
5. **Deployment Stuck**: Check pod logs for startup issues

### Debug Commands
```bash
# Check pipeline logs in GitHub Actions UI

# Check pod status
kubectl describe pod POD_NAME -n production

# Check deployment events  
kubectl describe deployment pci-backend-prod -n production

# Check service endpoints
kubectl get endpoints -n production
```

## 🏆 Success!

When everything is working:
- ✅ Pipeline runs automatically on `main` branch pushes
- ✅ Paralympic Committee website updates with zero downtime  
- ✅ All images load correctly from production URLs
- ✅ Database and API remain available during updates
- ✅ Cloudflare CDN serves the site globally

Your Paralympic Committee of India website now has fully automated CI/CD! 🇮🇳🏅
