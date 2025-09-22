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
