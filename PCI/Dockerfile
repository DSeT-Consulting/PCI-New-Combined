# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build arguments for Next.js environment variables
ARG NEXT_PUBLIC_BACKEND_URL="http://4.187.224.45"
ARG NEXT_PUBLIC_API_URL="/api"

# Set environment variables for the build
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# If you have a custom server or additional files, copy them here
# COPY --from=builder /app/.next/server ./.next/server

# Change ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Start the application
CMD ["node", "server.js"]
