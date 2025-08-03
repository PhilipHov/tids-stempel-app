// Quick test to verify the real problem
console.log('Current NODE_ENV:', process.env.NODE_ENV);
console.log('Production server test starting...');

// Import required modules
const path = require('path');
const fs = require('fs');

// Check if production files exist
const distPublicPath = path.resolve('./dist/public');
const indexPath = path.resolve('./dist/public/index.html');

console.log('Checking production files:');
console.log('- dist/public exists:', fs.existsSync(distPublicPath));
console.log('- index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf-8');
  console.log('- index.html size:', content.length);
  console.log('- First 200 chars:', content.substring(0, 200));
}