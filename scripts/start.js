#!/usr/bin/env node
// Start script that handles missing environment variables gracefully

// Set fallback environment variables for production
if (!process.env.DATABASE_URL) {
  console.log('DATABASE_URL not found. Application will use in-memory storage.');
}

if (!process.env.PORT) {
  process.env.PORT = '5000';
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Start the application
require('../dist/index.js');