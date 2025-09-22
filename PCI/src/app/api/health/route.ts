import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - you can add more checks here
    // For example, check database connectivity, external services, etc.
    
    const healthCheck = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'pci-frontend',
      version: process.env.npm_package_version ?? '1.0.0',
      environment: process.env.NODE_ENV ?? 'development'
    };

    return NextResponse.json(healthCheck, { status: 200 });
  } catch (error) {
    const errorResponse = {
      status: 'error',
      timestamp: new Date().toISOString(),
      service: 'pci-frontend',
      error: error instanceof Error ? error.message : 'Unknown error'
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
