# Stage 1: Build
FROM node:22-alpine as builder

WORKDIR /app

# Copy dependency files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# (Optional) Run any build scripts if needed
# RUN npm run build

# Stage 2: Production Image
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from the build stage
COPY --from=builder /app /app

# Expose the port your app uses
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
