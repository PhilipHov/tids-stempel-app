#!/bin/bash

echo "🚀 Building Tids Stempel App..."

# Set environment variables
export NODE_ENV=production
export DATABASE_URL=postgresql://temp:temp@localhost:5432/temp

echo "📦 Building frontend..."
npm run build

echo "🔧 Building backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "✅ Build completed successfully!"