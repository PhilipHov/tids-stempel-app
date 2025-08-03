#!/bin/bash

echo "🚀 Forbereder deployment til Replit..."

# Build projektet
echo "📦 Bygger projektet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Næste trin for Replit deployment:"
    echo "1. Gå til https://replit.com"
    echo "2. Opret en ny 'Node.js' repl"
    echo "3. Upload alle filer fra dit projekt"
    echo "4. I 'Secrets' tilføj:"
    echo "   DATABASE_URL=postgresql://temp:temp@localhost:5432/temp"
    echo "   NODE_ENV=production"
    echo "   PORT=5000"
    echo "5. Klik 'Deploy' knappen"
    echo ""
    echo "🔗 Din app vil være tilgængelig på:"
    echo "   https://din-repl-navn.din-username.replit.app"
    echo ""
    echo "📱 App features:"
    echo "- Clock in/out funktionalitet"
    echo "- Arbejdstid tracking"
    echo "- Mobile-responsive design"
    echo "- In-memory storage"
else
    echo "❌ Build fejlede!"
    exit 1
fi 