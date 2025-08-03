#!/bin/bash
# Custom build script that ensures DATABASE_URL is available during build

echo "Starting deployment build process..."

# Ensure DATABASE_URL is available during build (required by drizzle.config.ts)
if [ -z "$DATABASE_URL" ]; then
    echo "Setting temporary DATABASE_URL for build process..."
    export DATABASE_URL="postgresql://temp:temp@localhost:5432/temp"
else
    echo "Using existing DATABASE_URL for build..."
fi

echo "Running vite build..."
vite build

echo "Running esbuild for server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
echo "Application ready for deployment with in-memory storage."