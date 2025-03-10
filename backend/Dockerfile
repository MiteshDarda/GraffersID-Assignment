# ./backend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies for building only
RUN npm ci

COPY . .

RUN npm run build

# Production stage - fresh install of dependencies
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["npm", "run", "start:prod"]