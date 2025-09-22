#!/bin/bash

# Paralympic Committee of India - Production Deployment via Azure Cloud Shell
# Run this script in Azure Cloud Shell to deploy and get the production IP

echo "🏆 Paralympic Committee of India - Production Deployment"
echo "======================================================="

# Step 1: Connect to production cluster
echo "📡 Step 1: Connecting to production cluster..."
az aks get-credentials --resource-group pci-prod --name pci-production-aks

if [ $? -ne 0 ]; then
    echo "❌ Failed to connect to production cluster!"
    echo "Make sure you have access to pci-prod resource group"
    exit 1
fi

echo "✅ Connected to production cluster!"

# Step 2: Create namespace
echo "📁 Step 2: Creating production namespace..."
kubectl create namespace pci-production --dry-run=client -o yaml | kubectl apply -f -

# Step 3: Create ACR secret
echo "🔐 Step 3: Creating ACR access secret..."
ACR_SERVER=$(az acr show --name pciregistry --resource-group pci-prod --query loginServer -o tsv)
ACR_USERNAME=$(az acr credential show --name pciregistry --resource-group pci-prod --query username -o tsv)
ACR_PASSWORD=$(az acr credential show --name pciregistry --resource-group pci-prod --query passwords[0].value -o tsv)

kubectl create secret docker-registry acr-secret \
  --docker-server=$ACR_SERVER \
  --docker-username=$ACR_USERNAME \
  --docker-password=$ACR_PASSWORD \
  --namespace=pci-production \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ ACR secret created!"

# Step 4: Create application secrets
echo "🔑 Step 4: Creating application secrets..."
kubectl create secret generic pci-backend-secrets \
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
  --namespace=pci-production \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic pci-frontend-secrets \
  --from-literal=nextauth-secret="production-secret-key-change-me" \
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
  --namespace=pci-production \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Application secrets created!"

# Step 5: Deploy application (you'll need to upload the k8s configs first)
echo "🚀 Step 5: Ready to deploy application..."
echo "⚠️  NOTE: You need to upload your k8s configuration files to Cloud Shell first"
echo ""
echo "To upload files:"
echo "1. Click 'Upload/Download files' icon in Cloud Shell"
echo "2. Upload your entire k8s folder"
echo "3. Then run: kubectl apply -k k8s/overlays/production"
echo ""

# Step 6: Show how to get IP after deployment
echo "📋 After deployment, get your production IP with:"
echo "kubectl get ingress -n pci-production"
echo ""
echo "🎯 Expected result:"
echo "NAME          CLASS   HOSTS   ADDRESS         PORTS   AGE"
echo "pci-ingress   <none>  *       XX.XXX.XXX.XX   80      1m"
echo ""
echo "🏆 Your Paralympic Committee of India production site will be:"
echo "http://XX.XXX.XXX.XX"
echo "http://XX.XXX.XXX.XX/news"
