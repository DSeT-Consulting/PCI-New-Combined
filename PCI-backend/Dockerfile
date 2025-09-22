# Build stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build:dev

# Production stage
FROM node:20-alpine

# Install production dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --frozen-lockfile --production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle

# Copy database initialization files
COPY init-db/ ./init-db/

# Copy uploads directory with images
COPY uploads/ ./uploads/

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Start the application
CMD ["node", "dist/index.js"]
