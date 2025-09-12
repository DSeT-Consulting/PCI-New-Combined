# PCI Web Application

A full-stack web application with Next.js frontend and Express.js backend.

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v9.1.1 or higher)
- PostgreSQL (for development)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pci-web
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd PCI
   pnpm install

   # Install backend dependencies  
   cd ../PCI-backend
   pnpm install
   ```

## Environment Setup

1. **Frontend (.env file in `PCI/` directory)**:
   ```bash
   cp PCI/.env.example PCI/.env
   # Configure your frontend environment variables
   ```

2. **Backend (.env file in `PCI-backend/` directory)**:
   ```bash
   # Configure your backend environment variables
   # Database connection, JWT secrets, etc.
   ```

## Running the Application

### Method 1: Standard Development Setup

**Step 1: Start the Backend**
```bash
cd PCI-backend
pnpm run dev
```
The backend will be available at `http://localhost:8080`

**Step 2: Start the Frontend**
```bash
cd PCI
pnpm run dev
```
The frontend will be available at `http://localhost:3000`

### Method 2: Docker Setup (Optional)

If you prefer to run the database and services using Docker instead of the above steps:

**Step 1: Start Docker Services**
```bash
cd PCI-backend
pnpm run docker:up
```
This will start PostgreSQL and Adminer services.

**Step 2: Run Backend with Docker**
```bash
cd PCI-backend
pnpm run dev-docker
```

**Step 3: Start Frontend**
```bash
cd PCI
pnpm run dev
```

## Available Scripts

### Frontend (PCI/)
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run db:generate` - Generate database schema
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:push` - Push schema changes
- `pnpm run db:studio` - Open Drizzle Studio

### Backend (PCI-backend/)
- `pnpm run dev` - Start development server with nodemon
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run start` - Start production server
- `pnpm run test` - Run tests with coverage
- `pnpm run docker:up` - Start Docker services
- `pnpm run docker:down` - Stop Docker services
- `pnpm run drizzle:generate` - Generate database migrations
- `pnpm run drizzle:migrate` - Run database migrations

## Database Access

When using Docker setup:
- **PostgreSQL**: `localhost:5432`
  - Database: `pci`
  - Username: `pci` 
  - Password: `pciwebsite@123`
- **Adminer** (Database GUI): `http://localhost:8000`

## Production Build

1. Build backend:
   ```bash
   cd PCI-backend
   pnpm run build
   ```

2. Build frontend:
   ```bash
   cd PCI
   pnpm run build
   ```

3. Start production servers:
   ```bash
   # Start backend
   cd PCI-backend
   pnpm run start

   # Start frontend
   cd PCI
   pnpm run start
   ```

## Project Structure

```
pci-web/
├── PCI/              # Next.js Frontend
├── PCI-backend/      # Express.js Backend
└── README.md         # This file
```