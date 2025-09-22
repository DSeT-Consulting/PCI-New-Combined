#!/usr/bin/env pwsh

# Paralympic Committee of India - Production Database Deployment
# Deploy Paralympic database with proper schema and data

Write-Host "Paralympic Committee of India - Database Deployment" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green

# Step 1: Switch to staging cluster context  
Write-Host "`nStep 1: Connecting to staging cluster..." -ForegroundColor Yellow
kubectl config use-context pci-staging-aks

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to switch to staging cluster context!" -ForegroundColor Red
    exit 1
}

# Step 2: Check current production environment
Write-Host "`nStep 2: Checking production environment..." -ForegroundColor Yellow
kubectl get pods -n production

# Step 3: Check if postgres exists
Write-Host "`nStep 3: Checking for existing PostgreSQL..." -ForegroundColor Yellow
$postgresCheck = kubectl get pods -n production 2>$null | Select-String "postgres"

if (-not $postgresCheck) {
    Write-Host "Creating PostgreSQL database for Paralympic Committee..." -ForegroundColor Cyan
    
    # Create PostgreSQL StatefulSet
    $postgresYaml = @"
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: pci-postgres-prod
  namespace: production
  labels:
    app: pci-postgres-prod
    component: database
spec:
  serviceName: pci-postgres-prod
  replicas: 1
  selector:
    matchLabels:
      app: pci-postgres-prod
  template:
    metadata:
      labels:
        app: pci-postgres-prod
        component: database
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
        - name: PGDATA
          value: "/var/lib/postgresql/data/pgdata"
        ports:
        - containerPort: 5432
          name: postgres
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - pci
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          exec:
            command:
            - pg_isready
            - -U
            - pci
          initialDelaySeconds: 5
          periodSeconds: 5
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "default"
      resources:
        requests:
          storage: 20Gi
---
apiVersion: v1
kind: Service
metadata:
  name: pci-postgres-prod
  namespace: production
  labels:
    app: pci-postgres-prod
    component: database
spec:
  selector:
    app: pci-postgres-prod
  ports:
  - port: 5432
    targetPort: 5432
    protocol: TCP
    name: postgres
  clusterIP: None
"@

    $postgresYaml | kubectl apply -f -
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create PostgreSQL!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "PostgreSQL created! Waiting for it to be ready..." -ForegroundColor Green
    kubectl wait --for=condition=ready pod -l app=pci-postgres-prod -n production --timeout=300s
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "PostgreSQL failed to start within timeout!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "PostgreSQL already exists!" -ForegroundColor Green
}

# Step 4: Copy Paralympic SQL file to postgres pod
Write-Host "`nStep 4: Copying Paralympic database schema..." -ForegroundColor Yellow
kubectl cp PCI-backend/init-paralympic-db.sql production/pci-postgres-prod-0:/tmp/init-paralympic-db.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to copy SQL file!" -ForegroundColor Red
    exit 1
}

Write-Host "Paralympic database file copied successfully!" -ForegroundColor Green

# Step 5: Initialize Paralympic Committee database
Write-Host "`nStep 5: Initializing Paralympic Committee database..." -ForegroundColor Yellow
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -f /tmp/init-paralympic-db.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to initialize Paralympic database!" -ForegroundColor Red
    exit 1
}

Write-Host "Paralympic Committee database initialized successfully!" -ForegroundColor Green

# Step 6: Verify Paralympic data
Write-Host "`nStep 6: Verifying Paralympic Committee database..." -ForegroundColor Yellow

Write-Host "Checking database tables..." -ForegroundColor Cyan
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -c "\dt"

Write-Host "`nChecking Paralympic data counts..." -ForegroundColor Cyan
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -c "SELECT COUNT(*) as news_articles FROM news; SELECT COUNT(*) as categories FROM categories; SELECT COUNT(*) as tags FROM tags;"

Write-Host "`nSample Paralympic news..." -ForegroundColor Cyan
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -c "SELECT title, summary FROM news LIMIT 3;"

# Step 7: Update backend to use Paralympic database
Write-Host "`nStep 7: Updating backend to use Paralympic database..." -ForegroundColor Yellow
kubectl set env deployment/pci-backend-prod -n production DB_URL="postgresql://pci:pciwebsite@123@pci-postgres-prod:5432/pci"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend updated to use Paralympic database!" -ForegroundColor Green
} else {
    Write-Host "Failed to update backend!" -ForegroundColor Red
}

# Step 8: Wait for backend restart
Write-Host "`nStep 8: Waiting for backend to restart..." -ForegroundColor Yellow
kubectl rollout status deployment/pci-backend-prod -n production --timeout=300s

# Step 9: Get production IP
Write-Host "`nStep 9: Getting Paralympic production IP..." -ForegroundColor Yellow
Write-Host "Production LoadBalancer service:" -ForegroundColor Cyan
kubectl get service pci-production-lb -n production

Write-Host "`nPARALYMPIC COMMITTEE DATABASE DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=============================================================" -ForegroundColor Green
Write-Host "Paralympic Committee of India production database is ready!" -ForegroundColor Yellow
Write-Host "Test your Paralympic site with the IP above!" -ForegroundColor Cyan
Write-Host "Paralympic news and data should now be available!" -ForegroundColor Cyan
Write-Host "Production environment is ready for Paralympic Committee!" -ForegroundColor Green

Write-Host "`nQuick Test Commands:" -ForegroundColor Magenta
Write-Host "1. Check backend health: curl http://[PRODUCTION-IP]/api/health" -ForegroundColor White
Write-Host "2. Check Paralympic news: curl http://[PRODUCTION-IP]/api/news" -ForegroundColor White
Write-Host "3. Visit Paralympic site: http://[PRODUCTION-IP]" -ForegroundColor White
