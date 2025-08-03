#!/bin/bash

echo "🚀 GitHub Deployment Setup for Tids Stempel App"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository ikke fundet. Kør 'git init' først."
    exit 1
fi

echo "📦 Bygger projektet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Næste trin for GitHub deployment:"
    echo ""
    echo "1. Opret GitHub repository:"
    echo "   - Gå til https://github.com"
    echo "   - Klik 'New repository'"
    echo "   - Navngiv det: tids-stempel-app"
    echo "   - Vælg Public eller Private"
    echo ""
    echo "2. Push til GitHub:"
    echo "   git remote add origin https://github.com/DIT_USERNAME/tids-stempel-app.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "3. Deploy til Vercel (Anbefalet):"
    echo "   - Gå til https://vercel.com"
    echo "   - Log ind med GitHub"
    echo "   - Klik 'New Project'"
    echo "   - Vælg dit repository"
    echo "   - Klik 'Deploy'"
    echo ""
    echo "4. Environment Variables i Vercel:"
    echo "   DATABASE_URL=postgresql://temp:temp@localhost:5432/temp"
    echo "   NODE_ENV=production"
    echo "   PORT=5000"
    echo ""
    echo "🔗 Din app vil være tilgængelig på:"
    echo "   https://tids-stempel-app-xxx.vercel.app"
    echo ""
    echo "📱 App features:"
    echo "- Clock in/out funktionalitet"
    echo "- Arbejdstid tracking"
    echo "- Mobile-responsive design"
    echo "- Dansk interface"
    echo "- In-memory storage"
    echo ""
    echo "📖 Se GITHUB_DEPLOYMENT.md for detaljerede instruktioner"
else
    echo "❌ Build fejlede!"
    exit 1
fi 