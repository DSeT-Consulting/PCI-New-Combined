# PCI Backend

Express.js backend API for the PCI Web Application.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v9.1.1 or higher)
- PostgreSQL database (or Docker)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   # Create .env file and configure database connection
   # See .env.example for required variables
   ```

## Development

### Option 1: With Local Database
```bash
pnpm run dev
```

### Option 2: With Docker Database
```bash
# Start Docker services (PostgreSQL + Adminer)
pnpm run docker:up

# Run backend with Docker setup
pnpm run dev-docker
```

The API will be available at `http://localhost:8080` .

## Available Scripts

### Development
- `pnpm run dev` - Start development server with nodemon
- `pnpm run dev-docker` - Start with Docker database setup

### Database
- `pnpm run drizzle:generate` - Generate database migrations
- `pnpm run drizzle:migrate` - Run database migrations

### Docker
- `pnpm run docker:up` - Start PostgreSQL and Adminer containers
- `pnpm run docker:down` - Stop Docker containers

### Production
- `pnpm run build` - Build TypeScript to JavaScript
- `pnpm run start` - Start production server

### Testing
- `pnpm run test` - Run tests with coverage
- `pnpm run clean` - Remove dist and coverage folders

## Database Access

When using Docker setup:
- **PostgreSQL**: `localhost:5432`
  - Database: `pci`
  - Username: `pci`
  - Password: `pciwebsite@123`
- **Adminer** (Database GUI): `http://localhost:8000`

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Testing**: Jest with Supertest
- **Development**: Nodemon for hot reload
- **Package Manager**: pnpm

## Project Structure

```
src/
├── db/           # Database configuration and migrations
├── routes/       # API route handlers
├── middleware/   # Express middleware
├── types/        # TypeScript type definitions
└── index.ts      # Application entry point
```
