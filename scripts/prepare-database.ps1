# Prepare Database SQL File for Docker Build
# This script handles the pci-db.sql file and prepares it for deployment

param(
    [Parameter(Mandatory=$false)]
    [switch]$ConvertDump = $false
)

Write-Host "Preparing database files for deployment..." -ForegroundColor Green

# Check if pci-db.sql exists
$sqlFile = "PCI-backend\pci-db.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "pci-db.sql not found in PCI-backend directory" -ForegroundColor Red
    exit 1
}

# Create init-db directory
$initDbDir = "PCI-backend\init-db"
if (-not (Test-Path $initDbDir)) {
    New-Item -ItemType Directory -Path $initDbDir -Force | Out-Null
}

if ($ConvertDump) {
    Write-Host "Converting PostgreSQL dump to SQL script..." -ForegroundColor Yellow
    
    # If the file is a binary dump, we need to convert it
    # This requires pg_restore to be installed
    try {
        # Try to restore the dump to SQL format
        pg_restore --no-owner --no-privileges --clean --if-exists --verbose --format=custom --file="$initDbDir\schema.sql" $sqlFile
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully converted dump to SQL script" -ForegroundColor Green
        } else {
            throw "pg_restore failed"
        }
    } catch {
        Write-Host "pg_restore not available or dump conversion failed" -ForegroundColor Yellow
        Write-Host "Creating basic initialization script instead..." -ForegroundColor Cyan
        
        # Create a basic initialization script
        @"
-- PCI Database Initialization Script
-- This script initializes the basic database structure

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create drizzle schema for migrations
CREATE SCHEMA IF NOT EXISTS drizzle;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE pci TO pci;
GRANT ALL ON SCHEMA public TO pci;
GRANT ALL ON SCHEMA drizzle TO pci;

-- Note: Additional schema will be created by Drizzle migrations
COMMENT ON DATABASE pci IS 'Paralympic Committee of India Database';
"@ | Out-File -FilePath "$initDbDir\init.sql" -Encoding UTF8
    }
} else {
    Write-Host "Creating basic database initialization script..." -ForegroundColor Yellow
    
    # Create a basic initialization script that works with Drizzle
    @"
-- PCI Database Initialization Script
-- This script initializes the basic database structure for Paralympic Committee of India

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create drizzle schema for migrations
CREATE SCHEMA IF NOT EXISTS drizzle;

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE pci TO pci;
GRANT ALL ON SCHEMA public TO pci;
GRANT ALL ON SCHEMA drizzle TO pci;

-- Create basic tables that might be referenced
-- Note: Drizzle migrations will handle the complete schema

-- Log the initialization
INSERT INTO pg_stat_statements_info VALUES ('PCI Database initialized successfully');

COMMENT ON DATABASE pci IS 'Paralympic Committee of India - Official Database';
"@ | Out-File -FilePath "$initDbDir\01-init.sql" -Encoding UTF8

    Write-Host "Basic initialization script created" -ForegroundColor Green
}

# Copy the original file for reference
Copy-Item $sqlFile "$initDbDir\original-dump.sql" -Force

Write-Host "`nDatabase preparation completed!" -ForegroundColor Green
Write-Host "Files created in: $initDbDir" -ForegroundColor Cyan
Write-Host "`nNote: The application uses Drizzle ORM for schema management." -ForegroundColor Yellow
Write-Host "Run 'npm run drizzle:migrate' in the backend to apply the full schema." -ForegroundColor Yellow
