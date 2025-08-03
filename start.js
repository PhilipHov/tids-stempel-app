#!/usr/bin/env node

// Simple start script for Render deployment
const { spawn } = require('child_process');

console.log('🚀 Starting Tids Stempel App...');

// Set environment variables for Render
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '5000';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://temp:temp@localhost:5432/temp';

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

// Start the application
const child = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (error) => {
  console.error('❌ Failed to start application:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Application exited with code ${code}`);
  process.exit(code);
}); 