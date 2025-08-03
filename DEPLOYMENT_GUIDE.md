# Deployment Guide - Tids Stempel App

## 🚀 Hurtig Deployment til Replit

### Trin 1: Opret Replit Repository
1. Gå til [replit.com](https://replit.com)
2. Opret en ny "Node.js" repl
3. Upload alle filer fra dit projekt

### Trin 2: Konfigurer Environment Variables
I Replit, gå til "Secrets" og tilføj:
```
DATABASE_URL=postgresql://temp:temp@localhost:5432/temp
NODE_ENV=production
PORT=5000
```

### Trin 3: Deploy
1. Klik på "Deploy" knappen
2. Vælg "Autoscale" som deployment target
3. Vent på at build processet er færdigt

### Trin 4: Del Link
Din app vil være tilgængelig på: `https://din-repl-navn.din-username.replit.app`

## 🔧 Alternative Deployment Muligheder

### Vercel Deployment
```bash
# Installer Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment
1. Opret en `netlify.toml` fil
2. Upload til GitHub
3. Forbind til Netlify

### Railway Deployment
1. Opret konto på railway.app
2. Forbind GitHub repository
3. Deploy automatisk

## 📱 App Features
- ✅ Clock in/out funktionalitet
- ✅ Arbejdstid tracking
- ✅ Arbejdshistorik og rapporter
- ✅ Mobile-responsive design
- ✅ In-memory storage (ingen database påkrævet)

## 🔗 Delbare Links
Efter deployment kan du dele disse links:
- **Hovedapp**: `https://din-app-url.com`
- **API Endpoints**: `https://din-app-url.com/api/*`

## 🛠️ Troubleshooting
Hvis deployment fejler:
1. Tjek at alle environment variables er sat
2. Verificer at build processet kører uden fejl
3. Tjek server logs for fejlmeddelelser 