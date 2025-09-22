#!/usr/bin/env pwsh

# Paralympic Committee of India - Production Database Deployment
# Run this script to push pci-db-2.sql to production

Write-Host "🗃️ Paralympic Committee of India - Database Deployment" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green

# Step 1: Switch to staging cluster context
Write-Host "`n📡 Step 1: Connecting to staging cluster..." -ForegroundColor Yellow
kubectl config use-context pci-staging-aks

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to staging cluster context!" -ForegroundColor Red
    exit 1
}

# Step 2: Check current production pods
Write-Host "`n🔍 Step 2: Checking production environment..." -ForegroundColor Yellow
kubectl get pods -n production

# Step 3: Check if postgres exists
Write-Host "`n🔍 Step 3: Checking for existing PostgreSQL..." -ForegroundColor Yellow
$postgresCheck = kubectl get pods -n production 2>$null | findstr postgres
if (-not $postgresCheck) {
    Write-Host "📦 No PostgreSQL found. Creating production database..." -ForegroundColor Cyan
    
    # Create PostgreSQL StatefulSet
    $postgresYaml = @"
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: pci-postgres-prod
  namespace: production
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
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 20Gi
---
apiVersion: v1
kind: Service
metadata:
  name: pci-postgres-prod
  namespace: production
spec:
  selector:
    app: pci-postgres-prod
  ports:
  - port: 5432
    targetPort: 5432
  clusterIP: None
"@

    $postgresYaml | kubectl apply -f -
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to create PostgreSQL!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ PostgreSQL created! Waiting for it to be ready..." -ForegroundColor Green
    kubectl wait --for=condition=ready pod -l app=pci-postgres-prod -n production --timeout=300s
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ PostgreSQL failed to start within timeout!" -ForegroundColor Red
        exit 1
    }
}
else {
    Write-Host "✅ PostgreSQL already exists!" -ForegroundColor Green
}

# Step 4: Copy SQL file to postgres pod
Write-Host "`n📋 Step 4: Copying Paralympic database file..." -ForegroundColor Yellow
kubectl cp PCI-backend/pci-db-2.sql production/pci-postgres-prod-0:/tmp/pci-db-2.sql

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to copy SQL file!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Database file copied successfully!" -ForegroundColor Green

# Step 5: Import database
Write-Host "`n🗃️ Step 5: Importing Paralympic Committee database..." -ForegroundColor Yellow
Write-Host "Trying PostgreSQL custom format first..." -ForegroundColor Cyan

kubectl exec -it pci-postgres-prod-0 -n production -- pg_restore -U pci -d pci -v /tmp/pci-db-2.sql 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Custom format failed, trying as plain SQL..." -ForegroundColor Yellow
    kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -f /tmp/pci-db-2.sql
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ SQL import failed!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Database imported successfully!" -ForegroundColor Green

# Step 6: Verify import
Write-Host "`n🔍 Step 6: Verifying Paralympic Committee data..." -ForegroundColor Yellow
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -c "\dt"

Write-Host "`nChecking Paralympic data counts..." -ForegroundColor Cyan
kubectl exec -it pci-postgres-prod-0 -n production -- psql -U pci -d pci -c "SELECT 'News Articles:' as type, COUNT(*) as count FROM news UNION ALL SELECT 'Categories:' as type, COUNT(*) as count FROM categories;"

# Step 7: Update backend to use production database
Write-Host "`n🔄 Step 7: Updating backend to use production database..." -ForegroundColor Yellow
kubectl set env deployment/pci-backend-prod -n production DB_URL="postgresql://pci:pciwebsite@123@pci-postgres-prod:5432/pci"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend updated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to update backend!" -ForegroundColor Red
}

# Step 8: Get production IP
Write-Host "`n🌐 Step 8: Getting production IP..." -ForegroundColor Yellow
kubectl get service pci-production-lb -n production

Write-Host "`n🎉 PARALYMPIC COMMITTEE DATABASE DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=============================================================" -ForegroundColor Green
Write-Host "🏆 Your Paralympic Committee of India production database is ready!" -ForegroundColor Yellow
Write-Host "🌐 Test your production site with the IP above!" -ForegroundColor Cyan
Write-Host "📰 Paralympic news and data should now be available!" -ForegroundColor Cyan
Write-Host "Paralympic Committee of India is production-ready!" -ForegroundColor Green
