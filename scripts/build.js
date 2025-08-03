#!/usr/bin/env node
// Build script that handles missing DATABASE_URL during build phase

const { execSync } = require('child_process');

// Set a placeholder DATABASE_URL if not present during build
if (!process.env.DATABASE_URL) {
  console.log('Setting temporary DATABASE_URL for build process...');
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/placeholder';
}

try {
  console.log('Starting build process...');
  
  // Run the original build command
  execSync('vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit',
    env: process.env
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}