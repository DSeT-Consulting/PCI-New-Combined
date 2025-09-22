# Manual Azure Setup Guide for Paralympic Committee of India

This guide walks you through setting up the production infrastructure manually via Azure Portal.

## 🎯 **Infrastructure Overview**

### **Current Setup:**
- ✅ **Staging**: `pci-staging-aks` cluster in `PCI` resource group
- ✅ **Staging ACR**: `pcistaging.azurecr.io`

### **Production Setup Needed:**
- 🏆 **Production AKS Cluster** in `PCI-prod` resource group
- 🏆 **Production ACR**: `pciregistry.azurecr.io` (already created)

---

## 📋 **Step-by-Step Azure Portal Setup**

### **Step 1: Create Production AKS Cluster**

1. **Go to Azure Portal** → Search for "Kubernetes services"
2. **Click "Create" → "Kubernetes cluster"**

#### **Basics Tab:**
- **Subscription**: Microsoft Azure Sponsorship
- **Resource Group**: `PCI-prod` (already exists)
- **Cluster Name**: `pci-production-aks`
- **Region**: `Central India`
- **Kubernetes Version**: Latest stable (1.28.x or 1.29.x)
- **API Server Availability**: 99.9% (Standard)

#### **Node Pools Tab:**
- **Node Pool Name**: `production`
- **Node Size**: `Standard_D2s_v3` (2 vCPUs, 8GB RAM) or `Standard_D4s_v3` (4 vCPUs, 16GB RAM)
- **Scale Method**: `Autoscale`
- **Node Count Range**: Min: 3, Max: 10
- **Initial Node Count**: 3

#### **Authentication Tab:**
- **Authentication Method**: `System-assigned managed identity`
- **Enable Azure RBAC**: ✅ Checked

#### **Networking Tab:**
- **Network Configuration**: `Azure CNI`
- **Network Policy**: `Azure`
- **Enable Private Cluster**: ❌ Unchecked (for simplicity)

#### **Integrations Tab:**
- **Container Registry**: Select `pciregistry` (links your production ACR)
- **Azure Monitor**: ✅ Enable (for production monitoring)
- **Azure Policy**: ✅ Enable (for compliance)

#### **Advanced Tab:**
- **Enable Kubernetes RBAC**: ✅ Checked
- **Enable Azure Active Directory Integration**: ✅ Checked

3. **Click "Review + Create"** then **"Create"**
4. **Wait 10-15 minutes** for cluster creation

---

### **Step 2: Configure kubectl Access**

After cluster creation:

```bash
# Get production cluster credentials
az aks get-credentials --resource-group PCI-prod --name pci-production-aks --overwrite-existing

# Verify connection
kubectl get nodes
```

---

### **Step 3: Install Required Add-ons**

Run these commands to set up production add-ons:

```bash
# Create namespaces
kubectl create namespace pci-production
kubectl create namespace ingress-nginx
kubectl create namespace cert-manager

# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Install cert-manager for SSL
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.3/cert-manager.yaml

# Wait for installations
kubectl wait --for=condition=ready pod -l app=cert-manager -n cert-manager --timeout=300s
```

---

### **Step 4: Create Production Secrets**

```bash
# Get ACR credentials
$acrUsername = az acr credential show --name pciregistry --query username -o tsv
$acrPassword = az acr credential show --name pciregistry --query passwords[0].value -o tsv

# Create ACR secret for production
kubectl create secret docker-registry acr-secret \
  --namespace pci-production \
  --docker-server=pciregistry.azurecr.io \
  --docker-username=$acrUsername \
  --docker-password=$acrPassword
```

---

## 🏗️ **Alternative: Enhanced Namespace Separation (Same Cluster)**

If you prefer to use the existing cluster with better resource isolation:

### **Option A: Resource Quotas and Node Affinity**

1. **Label nodes for production:**
```bash
# Get node names
kubectl get nodes

# Label one node for production (replace NODE_NAME)
kubectl label nodes aks-agentpool-42536415-vmss000000 environment=production
kubectl label nodes aks-agentpool-42536415-vmss000001 environment=production
kubectl label nodes aks-agentpool-42536415-vmss000002 environment=staging
```

2. **Create resource quotas:**
```bash
# Apply production resource quota (create file first)
kubectl apply -f k8s/base/production-resource-quota.yaml
```

### **Option B: Use Existing Cluster with Separation**

Since your existing cluster is working well, we can deploy both environments with proper separation:

- **Staging**: `pci-staging` namespace (lower resources)
- **Production**: `pci-production` namespace (higher resources, priority)

---

## 🚀 **Ready to Deploy with Temporary Domain**

For testing before switching the real Paralympic Committee of India domain:

### **Step 1: Deploy with Temporary Configuration**

```bash
# Build and push to production ACR
.\scripts\build-and-push-existing.ps1 -Environment production

# Deploy with temporary ingress (no SSL, no domain restrictions)
.\scripts\deploy-to-aks.ps1 -Environment production
```

### **Step 2: Get the Temporary Access URL**

After deployment, get the external IP:
```bash
# Wait for external IP to be assigned (may take 2-5 minutes)
kubectl get service ingress-nginx-controller -n ingress-nginx

# Get the external IP and test
# You can access via: http://<EXTERNAL-IP>
```

### **Step 3: Tomorrow - Switch to Real Domain**

When you're ready to go live with www.paralympicindia.com:

```bash
# 1. Point DNS to the external IP from Step 2
# 2. Run the domain switch script
.\scripts\switch-to-real-domain.ps1
```

---

## 📊 **Final Infrastructure**

### **Option 1: Separate Clusters (Recommended)**
```
🏆 Production: pci-production-aks (PCI-prod RG)
   ├── pciregistry.azurecr.io
   ├── www.paralympicindia.com
   └── High resources (D2s_v3/D4s_v3)

🧪 Staging: pci-staging-aks (PCI RG)  
   ├── pcistaging.azurecr.io
   ├── staging.paralympicindia.com
   └── Lower resources (existing)
```

### **Option 2: Namespace Separation**
```
🏗️ Single Cluster: pci-staging-aks (PCI RG)
   ├── pci-production namespace (priority resources)
   ├── pci-staging namespace (remaining resources)
   ├── Both ACRs connected
   └── Domain routing via ingress
```

---

## 🎯 **Recommendation**

**I recommend Option 1 (separate clusters)** for Paralympic Committee of India because:

- ✅ **True isolation** between staging and production
- ✅ **Independent scaling** and resource allocation  
- ✅ **Better security** - production completely separate
- ✅ **No resource contention** during traffic spikes
- ✅ **Professional setup** for a national organization

Let me know which option you prefer, and I'll help you proceed with the deployment!
