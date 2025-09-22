# Paralympic Committee of India (PCI) - Azure AKS Deployment Guide

This guide provides step-by-step instructions for deploying the Paralympic Committee of India website to Azure Kubernetes Service (AKS) in a production environment in India Central region.

## Prerequisites

- Azure CLI installed and configured
- Docker Desktop running
- kubectl installed
- Helm 3 installed
- Azure subscription with appropriate permissions

## Architecture Overview

The deployment consists of:
- **Frontend**: Next.js application (React)
- **Backend**: Node.js/Express API with TypeScript
- **Database**: PostgreSQL with persistent storage
- **Ingress**: NGINX Ingress Controller with SSL termination
- **Container Registry**: Azure Container Registry (ACR)

## Quick Start

### 1. Setup Azure Resources

Run the setup script to create all necessary Azure resources:

```powershell
.\scripts\setup-azure-resources.ps1
```

This script will:
- Create the `PCI-prod` resource group
- Create Azure Container Registry
- Create AKS cluster with monitoring and auto-scaling
- Install NGINX Ingress Controller
- Install cert-manager for SSL certificates
- Configure ACR integration with AKS

### 2. Build and Push Images

Build and push Docker images to Azure Container Registry:

```powershell
.\scripts\build-and-push.ps1
```

### 3. Deploy to AKS

Deploy the application to production:

```powershell
.\scripts\deploy-to-aks.ps1 -Environment production
```

## Detailed Setup Instructions

### Step 1: Azure Login and Setup

```bash
# Login to Azure
az login

# Set subscription (if you have multiple)
az account set --subscription "your-subscription-id"
```

### Step 2: Configure Domain and SSL

1. Update the domain names in the configuration files:
   - `k8s/overlays/production/frontend-configmap-patch.yaml`
   - `k8s/overlays/production/backend-configmap-patch.yaml`
   - `k8s/base/ingress.yaml`
   - `k8s/overlays/production/cert-issuer.yaml`

2. The domain is already configured for `www.paralympicindia.com` (production) and `staging.paralympicindia.com` (staging).

### Step 3: Environment Variables and Secrets

Create a `.env.production` file with the following variables:

```env
POSTGRES_USER=pci
POSTGRES_PASSWORD=your-secure-password
DATABASE_URL=postgresql://pci:your-secure-password@pci-postgres:5432/pci
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### Step 4: DNS Configuration

After deployment, get the ingress IP address:

```bash
kubectl get ingress -n pci-prod
```

Configure your DNS to point `www.paralympicindia.com` to this IP address.

**Note**: You'll need to update your domain's DNS settings to point to the Azure Load Balancer IP address.

## Project Structure

```
├── .github/workflows/          # GitHub Actions CI/CD
├── k8s/
│   ├── base/                  # Base Kubernetes manifests
│   └── overlays/
│       ├── production/        # Production-specific configs
│       └── staging/           # Staging-specific configs
├── scripts/                   # Deployment scripts
├── PCI/                      # Frontend application
│   └── Dockerfile
├── PCI-backend/              # Backend application
│   └── Dockerfile
└── DEPLOYMENT.md             # This file
```

## Kubernetes Resources

### Base Resources

- **Deployments**: Frontend and Backend applications
- **Services**: ClusterIP services for internal communication
- **ConfigMaps**: Environment-specific configuration
- **StatefulSet**: PostgreSQL database with persistent storage
- **PersistentVolumeClaims**: Storage for database and file uploads
- **Ingress**: NGINX ingress with SSL termination

### Production Overlays

- **Resource Limits**: Higher CPU and memory limits
- **Replicas**: 3 replicas for high availability
- **SSL Certificates**: Let's Encrypt production certificates
- **Storage Classes**: Premium storage for production workloads

## Monitoring and Maintenance

### Health Checks

The application includes health check endpoints:
- Frontend: `GET /api/health`
- Backend: `GET /health`

### Logs

View application logs:

```bash
# Backend logs
kubectl logs -f deployment/pci-backend -n pci-prod

# Frontend logs
kubectl logs -f deployment/pci-frontend -n pci-prod

# Database logs
kubectl logs -f statefulset/pci-postgres -n pci-prod
```

### Scaling

Scale the application horizontally:

```bash
# Scale backend
kubectl scale deployment pci-backend --replicas=5 -n pci-prod

# Scale frontend
kubectl scale deployment pci-frontend --replicas=5 -n pci-prod
```

### Database Backup

Create database backups:

```bash
# Get postgres pod name
POD_NAME=$(kubectl get pods -n pci-prod -l app=pci-postgres -o jsonpath='{.items[0].metadata.name}')

# Create backup
kubectl exec -n pci-prod $POD_NAME -- pg_dump -U pci pci > backup-$(date +%Y%m%d).sql
```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy-production.yml`) automatically:

1. Builds Docker images on push to `main` branch
2. Pushes images to Azure Container Registry
3. Deploys to AKS production environment
4. Runs database migrations

### Required GitHub Secrets

Set the following secrets in your GitHub repository:

- `AZURE_CREDENTIALS`: Azure service principal credentials
- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `DATABASE_URL`: Complete database connection string
- `NEXTAUTH_SECRET`: NextAuth.js secret key

## Troubleshooting

### Common Issues

1. **Pod not starting**: Check resource limits and node capacity
2. **Database connection issues**: Verify service names and secrets
3. **SSL certificate issues**: Check cert-manager logs and DNS configuration
4. **Image pull errors**: Verify ACR credentials and image tags

### Useful Commands

```bash
# Check pod status
kubectl get pods -n pci-prod

# Describe pod for detailed information
kubectl describe pod <pod-name> -n pci-prod

# Check events
kubectl get events -n pci-prod --sort-by=.metadata.creationTimestamp

# Port forward for local access
kubectl port-forward svc/pci-frontend 3000:80 -n pci-prod
```

## Security Considerations

- All secrets are stored in Kubernetes secrets
- Images are pulled from private Azure Container Registry
- Network policies can be added for additional security
- RBAC is configured for service accounts
- SSL/TLS encryption for all external traffic

## Performance Optimization

- Use Azure Premium storage for database
- Configure horizontal pod autoscaling
- Implement resource quotas and limits
- Use Azure Monitor for performance monitoring

## Cost Optimization

- Use spot instances for non-critical workloads
- Configure cluster autoscaling
- Monitor resource usage and adjust accordingly
- Use Azure Cost Management for tracking

## Support

For deployment issues, check:
1. Azure AKS diagnostics
2. Application logs
3. Kubernetes events
4. Azure Monitor metrics

---

**Note**: The configuration is pre-configured for Paralympic Committee of India (www.paralympicindia.com). Update credentials and secrets as needed for your deployment.
