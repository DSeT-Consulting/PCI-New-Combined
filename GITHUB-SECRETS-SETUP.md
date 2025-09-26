# GitHub Secrets Setup for CI/CD Pipeline

This document outlines the required GitHub secrets that need to be configured in your repository for the CI/CD pipeline to work properly.

## Repository Secrets Configuration

Go to your GitHub repository: `https://github.com/DSeT-Consulting/PCI-New-Combined.git`

Navigate to: **Settings** → **Secrets and variables** → **Actions** → **Repository secrets**

## Required Secrets

### 1. Azure Credentials

#### For Staging Environment:
- **Secret Name**: `AZURE_CREDENTIALS_STAGING`
- **Description**: Azure service principal credentials for staging environment
- **Value**: JSON format containing:
```json
{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "your-subscription-id",
  "tenantId": "your-tenant-id"
}
```


### 2. Database Configuration

#### For Staging:
- **Secret Name**: `DATABASE_URL_STAGING`
- **Description**: PostgreSQL connection string for staging database
- **Value**: `postgresql://username:password@host:port/database_name`


### 3. PostgreSQL Credentials

- **Secret Name**: `POSTGRES_USER`
- **Description**: PostgreSQL username
- **Value**: Your PostgreSQL username

- **Secret Name**: `POSTGRES_PASSWORD`
- **Description**: PostgreSQL password
- **Value**: Your PostgreSQL password

### 4. NextAuth Configuration

- **Secret Name**: `NEXTAUTH_SECRET`
- **Description**: Secret key for NextAuth.js
- **Value**: A secure random string (32+ characters)

## How to Create Azure Service Principal

1. **Login to Azure CLI**:
   ```bash
   az login
   ```

2. **Create Service Principal for Staging**:
   ```bash
   az ad sp create-for-rbac --name "pci-staging-cicd" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/PCI --sdk-auth
   ```

3. **Copy the JSON output** and use it as the value for the `AZURE_CREDENTIALS_STAGING` secret.

## Required Permissions

The service principal needs the following permissions:
- **Contributor** role on the PCI resource group
- **AcrPush** role on the Azure Container Registry
- **Kubernetes Cluster User** role on the AKS cluster

## Environment Configuration

### Staging Environment
- **Resource Group**: `PCI`
- **AKS Cluster**: `pci-staging-aks`
- **ACR**: `pcistaging`
- **Namespace**: `pci-staging`

## Verification

After setting up the secrets, you can verify the configuration by:

1. **Manual Workflow Trigger**: Go to Actions tab → Select "CI/CD - Staging Deployment" → Click "Run workflow"
2. **Check Logs**: Monitor the workflow execution for any authentication or permission errors
3. **Test Deployment**: Verify that the application deploys successfully to the staging environment

## Security Best Practices

1. **Rotate Secrets Regularly**: Update service principal credentials periodically
2. **Least Privilege**: Only grant necessary permissions to service principals
3. **Monitor Access**: Regularly review service principal usage in Azure
4. **Secure Storage**: Never commit secrets to code repositories
5. **Environment Separation**: Use different service principals for staging and production

## Troubleshooting

### Common Issues:

1. **Authentication Failed**: Check if service principal credentials are correct
2. **Permission Denied**: Verify service principal has required roles
3. **Resource Not Found**: Ensure resource group and cluster names are correct
4. **ACR Push Failed**: Check if service principal has AcrPush role
5. **Kubernetes Access Denied**: Verify AKS cluster permissions

### Debug Commands:

```bash
# Test Azure login
az login --service-principal -u <client-id> -p <client-secret> --tenant <tenant-id>

# Test ACR access
az acr login --name <acr-name>

# Test AKS access
az aks get-credentials --resource-group <resource-group> --name <cluster-name>
kubectl get nodes
```

## Next Steps

1. Set up all required secrets in GitHub
2. Test the staging deployment workflow
3. Verify the application is accessible
4. Configure monitoring and alerting
