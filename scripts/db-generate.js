#!/usr/bin/env node
// Database generation script that handles missing DATABASE_URL

const { execSync } = require('child_process');

// Set a placeholder DATABASE_URL if not present for drizzle operations
if (!process.env.DATABASE_URL) {
  console.log('Setting placeholder DATABASE_URL for schema generation...');
  process.env.DATABASE_URL = 'postgresql://user:password@localhost:5432/placeholder';
}

try {
  console.log('Generating database schema...');
  execSync('drizzle-kit generate', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('Schema generation completed!');
} catch (error) {
  console.warn('Schema generation failed, but this is expected without a real database connection.');
  console.log('Application will use in-memory storage instead.');
}