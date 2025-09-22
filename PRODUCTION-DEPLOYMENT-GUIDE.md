# 🏆 Paralympic Committee of India - Production Deployment Guide

## ✅ **Current Status**

**✅ PRODUCTION IMAGES READY**
- Frontend: `pciregistry.azurecr.io/pci-frontend:latest` ✅ **PUSHED**
- Backend: `pciregistry.azurecr.io/pci-backend:latest` ✅ **PUSHED**
- Configuration: ✅ **Production-ready with paralympicindia.com domain**

**🔒 Production Cluster Access Issue**
- Cluster: `pci-production-aks` in `pci-prod` resource group
- Issue: Uses **private link endpoint** (security feature)
- Solution: Deploy from **Azure Cloud Shell** or **VM with network access**

## 🚀 **Deploy to Production**

### Option 1: Azure Cloud Shell (Recommended)

1. **Open Azure Cloud Shell**: https://shell.azure.com
2. **Clone repository**:
   ```bash
   git clone <your-repo-url>
   cd PCI-New-Combined-Prod
   ```

3. **Run deployment**:
   ```bash
   # Get cluster credentials
   az aks get-credentials --resource-group pci-prod --name pci-production-aks
   
   # Deploy Paralympic Committee of India
   kubectl apply -k k8s/overlays/production
   
   # Create namespace
   kubectl create namespace pci-production
   
   # Create secrets
   kubectl create secret generic pci-backend-secrets \
     --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
     --namespace=pci-production
   
   kubectl create secret generic pci-frontend-secrets \
     --from-literal=nextauth-secret="your-nextauth-secret-here" \
     --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
     --namespace=pci-production
   
   # Create ACR secret
   kubectl create secret docker-registry acr-secret \
     --docker-server=pciregistry.azurecr.io \
     --docker-username=$(az acr credential show --name pciregistry --resource-group pci-prod --query username -o tsv) \
     --docker-password=$(az acr credential show --name pciregistry --resource-group pci-prod --query passwords[0].value -o tsv) \
     --namespace=pci-production
   
   # Wait for deployment
   kubectl wait --for=condition=available deployment --all -n pci-production --timeout=600s
   
   # Get production IP
   kubectl get ingress -n pci-production
   ```

### Option 2: PowerShell Commands

If you have access to the production cluster, run these commands:

```powershell
# Switch to production cluster
kubectl config use-context pci-production-aks

# Create namespace
kubectl create namespace pci-production

# Deploy
kubectl apply -k k8s/overlays/production

# Create secrets (run these commands)
kubectl create secret generic pci-backend-secrets --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" --namespace=pci-production

kubectl create secret generic pci-frontend-secrets --from-literal=nextauth-secret="your-nextauth-secret-here" --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" --namespace=pci-production

# Get production status
kubectl get pods,services,ingress -n pci-production
```

## 🌐 **Expected Results**

After successful deployment:

1. **✅ Production IP assigned**: Get from `kubectl get ingress -n pci-production`
2. **✅ Paralympic Committee of India website live**: `http://<PRODUCTION-IP>`
3. **✅ News section working**: `http://<PRODUCTION-IP>/news`
4. **✅ Same functionality as staging**: All features working

## 🎯 **Domain Configuration**

Once production is running:

1. **Test production site**: Use the production IP address
2. **Configure DNS**: Point `paralympicindia.com` A record to production IP
3. **Go live**: Paralympic Committee of India accessible at `https://www.paralympicindia.com`

## 📊 **Production Configuration**

- **Domain**: `https://www.paralympicindia.com`
- **API Calls**: `https://www.paralympicindia.com/api/*`
- **Registry**: `pciregistry.azurecr.io`
- **Namespace**: `pci-production`
- **Cluster**: `pci-production-aks` (pci-prod resource group)

## 🏅 **Ready for Go-Live!**

The Paralympic Committee of India website is **production-ready** with:
- ✅ **Working news system** (tested in staging)
- ✅ **Production images built and pushed**
- ✅ **Domain-ready configuration**
- ✅ **All features functional**

**Deploy using Azure Cloud Shell and the Paralympic Committee of India will be live!**
