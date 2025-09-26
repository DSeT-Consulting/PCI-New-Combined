# Staging Deployment Guide

This guide explains how to deploy your PCI application to the staging environment using GitHub Actions CI/CD pipeline.

## Overview

The staging deployment is triggered automatically when you push code to the following branches:
- `develop`
- `staging`

## Prerequisites

1. **GitHub Repository**: Code must be pushed to `https://github.com/DSeT-Consulting/PCI-New-Combined.git`
2. **GitHub Secrets**: All required secrets must be configured (see `GITHUB-SECRETS-SETUP.md`)
3. **Azure Resources**: Staging environment must be set up in Azure

## Deployment Process

### Automatic Deployment

1. **Push Code**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin develop  # or staging
   ```

2. **Monitor Workflow**:
   - Go to GitHub repository → Actions tab
   - Find "CI/CD - Staging Deployment" workflow
   - Click on the running workflow to monitor progress

### Manual Deployment

1. **Trigger Workflow**:
   - Go to GitHub repository → Actions tab
   - Select "CI/CD - Staging Deployment"
   - Click "Run workflow"
   - Select branch and click "Run workflow"

## Workflow Steps

The staging deployment workflow includes:

### 1. Testing Phase
- **Backend Tests**: Runs unit and integration tests
- **Frontend Build**: Builds the Next.js application
- **Dependency Installation**: Installs all required packages

### 2. Build Phase
- **Docker Images**: Builds both frontend and backend Docker images
- **Image Tagging**: Tags images with commit SHA and latest
- **Registry Push**: Pushes images to Azure Container Registry

### 3. Deployment Phase
- **Namespace Creation**: Creates `pci-staging` namespace if it doesn't exist
- **Secrets Management**: Creates/updates Kubernetes secrets
- **Kustomize Deployment**: Deploys using Kustomize overlays
- **Database Migration**: Runs database migrations
- **Health Checks**: Verifies deployment success

## Environment Configuration

### Staging Environment Details
- **Namespace**: `pci-staging`
- **Resource Group**: `PCI`
- **AKS Cluster**: `pci-staging-aks`
- **Container Registry**: `pcistaging`
- **Database**: Staging PostgreSQL instance

### Kubernetes Resources
- **Backend Deployment**: `pci-backend`
- **Frontend Deployment**: `pci-frontend`
- **PostgreSQL StatefulSet**: `pci-postgres`
- **Services**: Backend, Frontend, and PostgreSQL services
- **Ingress**: External access configuration

## Monitoring Deployment

### 1. GitHub Actions Logs
- Check the Actions tab for real-time logs
- Look for any error messages or warnings
- Verify all steps complete successfully

### 2. Kubernetes Dashboard
```bash
# Get AKS credentials
az aks get-credentials --resource-group PCI --name pci-staging-aks

# Check pod status
kubectl get pods -n pci-staging

# Check services
kubectl get services -n pci-staging

# Check ingress
kubectl get ingress -n pci-staging
```

### 3. Application Health
- **Backend Health**: Check if backend pods are running
- **Frontend Health**: Verify frontend deployment
- **Database Health**: Ensure PostgreSQL is accessible
- **External Access**: Test application through ingress

## Troubleshooting

### Common Issues

#### 1. Build Failures
- **Dependency Issues**: Check package.json and pnpm-lock.yaml
- **Docker Build Errors**: Verify Dockerfile configurations
- **Registry Push Failures**: Check ACR permissions

#### 2. Deployment Failures
- **Namespace Issues**: Verify namespace creation
- **Secret Problems**: Check secret configuration
- **Resource Limits**: Monitor resource usage

#### 3. Application Issues
- **Database Connection**: Verify database URL and credentials
- **Environment Variables**: Check ConfigMap and Secret values
- **Network Issues**: Verify service and ingress configuration

### Debug Commands

```bash
# Check pod logs
kubectl logs -n pci-staging deployment/pci-backend
kubectl logs -n pci-staging deployment/pci-frontend

# Describe resources
kubectl describe pod -n pci-staging -l app=pci-backend
kubectl describe service -n pci-staging pci-backend

# Check events
kubectl get events -n pci-staging --sort-by='.lastTimestamp'

# Port forward for testing
kubectl port-forward -n pci-staging service/pci-backend 3000:3000
kubectl port-forward -n pci-staging service/pci-frontend 3001:3000
```

## Rollback Procedures

### 1. Quick Rollback
```bash
# Rollback to previous deployment
kubectl rollout undo deployment/pci-backend -n pci-staging
kubectl rollout undo deployment/pci-frontend -n pci-staging
```

### 2. Specific Version Rollback
```bash
# List deployment history
kubectl rollout history deployment/pci-backend -n pci-staging

# Rollback to specific revision
kubectl rollout undo deployment/pci-backend -n pci-staging --to-revision=2
```

## Best Practices

### 1. Code Quality
- Run tests locally before pushing
- Use meaningful commit messages
- Follow branching strategy

### 2. Deployment Safety
- Test in staging before production
- Monitor deployment progress
- Have rollback plan ready

### 3. Monitoring
- Set up alerts for deployment failures
- Monitor application performance
- Track resource usage

## Next Steps

After successful staging deployment:

1. **Test Application**: Verify all features work correctly
2. **Performance Testing**: Run load tests if needed
3. **Security Testing**: Check for vulnerabilities
4. **Code Review**: Ensure code quality before merging

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review Kubernetes events
3. Consult troubleshooting section
4. Contact DevOps team if needed
