# 🚀 Paralympic Committee of India - Production Deployment Commands

## 🎯 **Deploy Production to Get Azure IP**

### **Step 1: Open Azure Cloud Shell**
Go to: **https://shell.azure.com**

### **Step 2: Connect to Production Cluster**
```bash
az aks get-credentials --resource-group pci-prod --name pci-production-aks
```

### **Step 3: Create Namespace & Secrets**
```bash
# Create namespace
kubectl create namespace pci-production

# Create ACR secret
kubectl create secret docker-registry acr-secret \
  --docker-server=pciregistry.azurecr.io \
  --docker-username=$(az acr credential show --name pciregistry --resource-group pci-prod --query username -o tsv) \
  --docker-password=$(az acr credential show --name pciregistry --resource-group pci-prod --query passwords[0].value -o tsv) \
  --namespace=pci-production

# Create backend secrets
kubectl create secret generic pci-backend-secrets \
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
  --namespace=pci-production

# Create frontend secrets  
kubectl create secret generic pci-frontend-secrets \
  --from-literal=nextauth-secret="production-secret-key" \
  --from-literal=database-url="postgresql://pci:pciwebsite@123@pci-postgres:5432/pci" \
  --namespace=pci-production
```

### **Step 4: Deploy Olympic Website**
```bash
# Apply production configuration
kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: pci-backend-config
  namespace: pci-production
data:
  cors-origin: "*"
  log-level: "info"
  max-upload-size: "10m"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: pci-frontend-config
  namespace: pci-production
data:
  api-url: "/api"
  backend-url: "http://REPLACE-WITH-IP"
  nextauth-url: "http://REPLACE-WITH-IP"
  public-url: "http://REPLACE-WITH-IP"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pci-backend
  namespace: pci-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pci-backend
  template:
    metadata:
      labels:
        app: pci-backend
    spec:
      containers:
      - name: pci-backend
        image: pciregistry.azurecr.io/pci-backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_URL
          valueFrom:
            secretKeyRef:
              name: pci-backend-secrets
              key: database-url
        - name: PORT
          value: "3000"
        - name: CORS_ORIGIN
          valueFrom:
            configMapKeyRef:
              name: pci-backend-config
              key: cors-origin
      imagePullSecrets:
      - name: acr-secret
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pci-frontend
  namespace: pci-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: pci-frontend
  template:
    metadata:
      labels:
        app: pci-frontend
    spec:
      containers:
      - name: pci-frontend
        image: pciregistry.azurecr.io/pci-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_API_URL
          valueFrom:
            configMapKeyRef:
              name: pci-frontend-config
              key: api-url
        - name: NEXT_PUBLIC_BACKEND_URL
          valueFrom:
            configMapKeyRef:
              name: pci-frontend-config
              key: backend-url
      imagePullSecrets:
      - name: acr-secret
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: pci-postgres
  namespace: pci-production
spec:
  serviceName: pci-postgres
  replicas: 1
  selector:
    matchLabels:
      app: pci-postgres
  template:
    metadata:
      labels:
        app: pci-postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          value: "pci"
        - name: POSTGRES_USER
          value: "pci"
        - name: POSTGRES_PASSWORD
          value: "pciwebsite@123"
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: pci-backend
  namespace: pci-production
spec:
  selector:
    app: pci-backend
  ports:
  - port: 80
    targetPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: pci-frontend
  namespace: pci-production
spec:
  selector:
    app: pci-frontend
  ports:
  - port: 80
    targetPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: pci-postgres
  namespace: pci-production
spec:
  selector:
    app: pci-postgres
  ports:
  - port: 5432
    targetPort: 5432
  clusterIP: None
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pci-ingress
  namespace: pci-production
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: pci-backend
            port:
              number: 80
      - path: /
        pathType: Prefix
        backend:
          service:
            name: pci-frontend
            port:
              number: 80
EOF
```

### **Step 5: Get Your Production IP**
```bash
# Wait for ingress to get IP
kubectl wait --for=condition=available deployment --all -n pci-production --timeout=300s

# Get the Azure-assigned IP
kubectl get ingress -n pci-production
```

### **Step 6: Test Your Production Site**
Once you get the IP (e.g., `XX.XXX.XXX.XX`):
```bash
# Test main site
curl -I http://XX.XXX.XXX.XX

# Test news
curl -I http://XX.XXX.XXX.XX/news

# Test API
curl http://XX.XXX.XXX.XX/api/news
```

## 🎉 **Result**
You'll get your Paralympic Committee of India production website at:
- **Main**: `http://XX.XXX.XXX.XX`
- **News**: `http://XX.XXX.XXX.XX/news`
- **API**: `http://XX.XXX.XXX.XX/api/news`

**Copy these commands into Azure Cloud Shell to deploy and get your production IP!**
