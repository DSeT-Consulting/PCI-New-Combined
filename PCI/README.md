# PCI Frontend

Next.js frontend application for the PCI Web Application.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v9.1.1 or higher)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure the environment variables in `.env` file.

### Development

Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

### Database Scripts

- `pnpm run db:generate` - Generate database schema
- `pnpm run db:migrate` - Run database migrations
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:studio` - Open Drizzle Studio

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Drizzle ORM with PostgreSQL
- **Authentication**: Supabase
- **Package Manager**: pnpm

## Project Structure

```
src/
├── app/          # App Router pages
├── components/   # Reusable components
├── lib/         # Utility functions
└── styles/      # Global styles
```