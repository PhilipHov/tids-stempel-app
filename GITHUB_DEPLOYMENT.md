# GitHub Deployment Guide 🚀

## Trin 1: Opret GitHub Repository

1. Gå til [github.com](https://github.com)
2. Klik "New repository"
3. Navngiv det: `tids-stempel-app`
4. Vælg "Public" eller "Private"
5. Klik "Create repository"

## Trin 2: Push til GitHub

```bash
# Tilføj remote repository
git remote add origin https://github.com/DIT_USERNAME/tids-stempel-app.git

# Push til GitHub
git branch -M main
git push -u origin main
```

## Trin 3: Deploy til Vercel (Anbefalet)

### Automatisk Deployment:
1. Gå til [vercel.com](https://vercel.com)
2. Log ind med din GitHub konto
3. Klik "New Project"
4. Vælg dit `tids-stempel-app` repository
5. Klik "Deploy"

### Environment Variables i Vercel:
```
DATABASE_URL=postgresql://temp:temp@localhost:5432/temp
NODE_ENV=production
PORT=5000
```

## Trin 4: Deploy til Netlify (Alternativ)

1. Gå til [netlify.com](https://netlify.com)
2. Klik "New site from Git"
3. Vælg GitHub og dit repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
5. Klik "Deploy site"

## Trin 5: GitHub Actions (Automatisk)

Repository'et har allerede GitHub Actions konfigureret. For at aktivere det:

1. Gå til dit repository på GitHub
2. Klik "Actions" tab
3. Klik "Run workflow" på "Deploy Tids Stempel App"

## 🔗 Din App er nu Live!

Efter deployment får du en URL som:
- **Vercel**: `https://tids-stempel-app-xxx.vercel.app`
- **Netlify**: `https://tids-stempel-app-xxx.netlify.app`

## 📱 Features Live:
- ✅ Clock in/out funktionalitet
- ✅ Arbejdstid tracking
- ✅ Mobile-responsive design
- ✅ Dansk interface
- ✅ In-memory storage

## 🔄 Automatisk Updates:
Hver gang du pusher til `main` branch, deployes appen automatisk!

## 🛠️ Troubleshooting:
- Hvis build fejler, tjek GitHub Actions logs
- Sørg for at alle environment variables er sat
- Verificer at `package.json` har korrekte scripts 