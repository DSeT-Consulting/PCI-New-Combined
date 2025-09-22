# GitHub CI/CD Setup for Paralympic Committee of India

This guide explains how to set up the automated CI/CD pipeline for the Paralympic Committee of India website.

## 🏗️ **CI/CD Architecture**

### **Branch Strategy:**
```
main/master     →  🏆 Production (www.paralympicindia.com)
develop/staging →  🧪 Staging (staging.paralympicindia.com)  
feature/*       →  🔧 PR Preview environments
```

### **Automatic Deployments:**
- ✅ **Push to `develop`** → Auto-deploy to staging
- ✅ **Push to `main`** → Auto-deploy to production (with safety checks)
- ✅ **Open PR** → Create temporary preview environment
- ✅ **Close PR** → Cleanup preview environment

---

## 🔐 **Required GitHub Secrets**

### **1. Azure Service Principal Credentials**

Create two service principals (one for staging, one for production):

#### **For Staging:**
```bash
# Create service principal for staging
az ad sp create-for-rbac --name "PCI-GitHub-Staging" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/PCI

# Copy the output JSON and add as GitHub secret: AZURE_CREDENTIALS_STAGING
```

#### **For Production:**
```bash
# Create service principal for production  
az ad sp create-for-rbac --name "PCI-GitHub-Production" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/PCI-prod

# Copy the output JSON and add as GitHub secret: AZURE_CREDENTIALS_PRODUCTION
```

### **2. Database & Application Secrets**

Add these secrets in GitHub Repository Settings → Secrets and variables → Actions:

```
AZURE_CREDENTIALS_STAGING       # Azure SP JSON for staging
AZURE_CREDENTIALS_PRODUCTION    # Azure SP JSON for production

# Database secrets
POSTGRES_USER                   # PostgreSQL username (e.g., pci)
POSTGRES_PASSWORD              # Strong PostgreSQL password

# Environment-specific database URLs
DATABASE_URL_STAGING           # postgresql://user:pass@staging-db:5432/pci
DATABASE_URL_PRODUCTION        # postgresql://user:pass@prod-db:5432/pci

# Application secrets
NEXTAUTH_SECRET                # Random string for NextAuth.js (32+ chars)
```

---

## 🚀 **Deployment Workflows**

### **1. Staging Deployment** (`.github/workflows/ci-cd-staging.yml`)

**Triggers:**
- Push to `develop` or `staging` branch
- Pull requests to `develop` or `staging`

**What it does:**
1. ✅ Runs tests (backend + frontend)
2. 🏗️ Builds Docker images
3. 📤 Pushes to staging ACR (`pcistaging.azurecr.io`)
4. 🚀 Deploys to staging cluster (`pci-staging-aks`)
5. 🔄 Runs database migrations
6. ✅ Verifies deployment

### **2. Production Deployment** (`.github/workflows/ci-cd-production.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Manual workflow dispatch (with confirmation)
- Git tags starting with `v` (e.g., `v1.0.0`)

**Safety Features:**
- 🛡️ Requires manual confirmation for workflow dispatch
- 🧪 Only deploys if tests pass
- 📈 Extended timeout for production stability
- 🔍 Health checks after deployment
- 🏆 Uses production environment protection

### **3. PR Preview** (`.github/workflows/pr-preview.yml`)

**What it does:**
1. 🔧 Creates temporary namespace (`pr-{number}`)
2. 🏗️ Builds images with PR-specific tags
3. 🚀 Deploys isolated preview environment
4. 💬 Comments on PR with preview URL
5. 🧹 Auto-cleanup when PR is closed

---

## 📋 **Setup Steps**

### **Step 1: Create Azure Service Principals**

```bash
# Get your subscription ID
az account show --query id -o tsv

# Create staging service principal
az ad sp create-for-rbac --name "PCI-GitHub-Staging" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/PCI \
  --sdk-auth

# Create production service principal  
az ad sp create-for-rbac --name "PCI-GitHub-Production" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/PCI-prod \
  --sdk-auth
```

### **Step 2: Add GitHub Secrets**

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add all the secrets listed above

### **Step 3: Set Up Branch Protection**

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require status checks to pass
   - ✅ Require pull request reviews
   - ✅ Restrict pushes to specific people/teams

### **Step 4: Enable GitHub Environments**

1. Go to Settings → Environments
2. Create `production` environment
3. Add protection rules:
   - ✅ Required reviewers (add yourself)
   - ⏱️ Wait timer (optional, e.g., 5 minutes)

---

## 🔄 **Workflow Examples**

### **Feature Development:**
```bash
# 1. Create feature branch
git checkout -b feature/new-athlete-page

# 2. Make changes and commit
git add .
git commit -m "Add new athlete page"
git push origin feature/new-athlete-page

# 3. Open PR → Automatic preview environment created
# 4. Review changes in preview URL
# 5. Merge PR → Preview cleaned up automatically
```

### **Staging Deployment:**
```bash
# 1. Merge to develop branch
git checkout develop
git merge feature/new-athlete-page
git push origin develop

# 2. Automatic staging deployment triggered
# 3. Test on staging.paralympicindia.com
```

### **Production Deployment:**
```bash
# 1. Merge to main branch
git checkout main
git merge develop
git push origin main

# 2. Automatic production deployment
# 3. Paralympic Committee of India website updated!
```

### **Emergency Production Deploy:**
```bash
# 1. Go to GitHub Actions
# 2. Select "CI/CD - Production Deployment"
# 3. Click "Run workflow"
# 4. Type "DEPLOY-PRODUCTION" to confirm
# 5. Manual deployment triggered
```

---

## 📊 **Monitoring & Notifications**

### **Deployment Status:**
- ✅ GitHub Actions provides real-time status
- 📧 Email notifications on failure
- 💬 PR comments with preview URLs

### **Health Checks:**
- 🔍 Automatic backend health endpoint testing
- 📈 Kubernetes rollout status verification
- 🗄️ Database migration status

### **Rollback Strategy:**
```bash
# Rollback to previous version
kubectl rollout undo deployment/pci-backend -n pci-production
kubectl rollout undo deployment/pci-frontend -n pci-production
```

---

## 🎯 **Benefits for Paralympic Committee of India**

- ✅ **Zero Downtime**: Rolling deployments
- 🚀 **Fast Iterations**: Automatic staging deployments
- 🔒 **Safe Production**: Manual confirmation required
- 🧪 **PR Testing**: Isolated preview environments
- 📈 **Scalability**: Auto-scaling based on traffic
- 🔍 **Monitoring**: Built-in health checks
- 🔄 **Easy Rollbacks**: One command to revert

---

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Deployment Timeout:**
   - Check resource quotas in Azure
   - Verify cluster has sufficient nodes

2. **Image Pull Errors:**
   - Verify ACR credentials are correct
   - Check if images were pushed successfully

3. **Database Connection Issues:**
   - Verify database secrets are correct
   - Check if PostgreSQL pod is running

4. **SSL Certificate Issues:**
   - Wait 5-10 minutes for Let's Encrypt
   - Check cert-manager logs

### **Useful Commands:**

```bash
# Check deployment status
kubectl get pods -n pci-production

# View logs
kubectl logs -f deployment/pci-backend -n pci-production

# Check ingress
kubectl get ingress -n pci-production

# View certificates
kubectl get certificate -n pci-production
```

---

## 🏆 **Ready for Paralympic Committee of India!**

This CI/CD setup ensures:
- Professional deployment pipeline
- Safe production releases
- Quick feature testing
- Automatic scaling for Paralympics events
- Enterprise-grade reliability

The Paralympic Committee of India website will have a world-class deployment infrastructure! 🥇
