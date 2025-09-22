# 🎯 Get Production IP for Paralympic Committee of India

## 🔍 **Finding the Azure-Assigned Production IP**

Since the production cluster uses private networking, use **Azure Cloud Shell** to get the ingress IP:

### **Step 1: Open Azure Cloud Shell**
1. Go to: **https://shell.azure.com**
2. Choose **Bash** or **PowerShell**

### **Step 2: Connect to Production Cluster**
```bash
# Get cluster credentials
az aks get-credentials --resource-group pci-prod --name pci-production-aks
```

### **Step 3: Get the Production IP**
```bash
# Get ingress IP address
kubectl get ingress -n pci-production

# Alternative: Check all load balancer services
kubectl get services --all-namespaces --field-selector spec.type=LoadBalancer

# Or check ingress controller specifically
kubectl get service -n ingress-nginx nginx-ingress-ingress-nginx-controller
```

### **Step 4: Test the Production Site**
Once you get the IP address (e.g., `X.X.X.X`), test:
```bash
# Test main site
curl -I http://X.X.X.X

# Test news page
curl -I http://X.X.X.X/news

# Test API
curl http://X.X.X.X/api/news
```

## 🎯 **Expected Output**

You should get an IP address like:
- **Ingress IP**: `XX.XXX.XXX.XX`
- **Production URLs**:
  - Main site: `http://XX.XXX.XXX.XX`
  - News: `http://XX.XXX.XXX.XX/news`
  - API: `http://XX.XXX.XXX.XX/api/news`

## 🏆 **What You'll Have**

✅ **Production Paralympic Committee of India Website**
- Same functionality as staging (`http://4.187.224.45`)
- Working news section with Paralympic articles
- All API endpoints functional
- Ready for DNS configuration later

## 📝 **Next Steps After Getting IP**

1. **Test the production site** using the Azure-assigned IP
2. **Verify all functionality** works (news, API, etc.)
3. **Later**: Configure DNS to point `paralympicindia.com` → Production IP
4. **Go live** with the official domain

**Use Azure Cloud Shell to get the production IP address!**
