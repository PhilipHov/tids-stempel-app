#!/bin/bash

echo "🚀 Starting deployment of Danish Time Tracking Application..."

# Set environment variables for deployment
export NODE_ENV=production
export PORT=${PORT:-3000}
export HOST=${HOST:-localhost}

echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Starting server on http://$HOST:$PORT"
    echo "📱 Application is ready for use!"
    echo ""
    echo "Features available:"
    echo "- Clock in/out functionality"
    echo "- Work time tracking"
    echo "- Work history and reporting"
    echo "- Mobile-responsive interface"
    echo "- In-memory storage (no database required)"
    echo ""
    echo "Press Ctrl+C to stop the server"
    
    # Start the server
    node dist/index.js
else
    echo "❌ Build failed!"
    exit 1
fi 