# GitHub Publishing Guide 🚀

## Din Tids Stempel App er nu klar til publicering!

Dit projekt er nu på GitHub: `https://github.com/PhilipHov/tids-stempel-app`

## 🎯 Gratis Hosting Muligheder

### 1. **Render (Anbefalet - Gratis)**
1. Gå til [render.com](https://render.com)
2. Log ind med din GitHub konto
3. Klik "New Web Service"
4. Vælg dit repository: `PhilipHov/tids-stempel-app`
5. Build Command: `npm run build`
6. Start Command: `npm run start`
7. Environment Variables:
   ```
   DATABASE_URL=postgresql://temp:temp@localhost:5432/temp
   NODE_ENV=production
   PORT=5000
   ```
8. Klik "Create Web Service"

**Din app vil være live på:** `https://tids-stempel-app.onrender.com`

### 2. **Railway (Alternativ - Gratis)**
1. Gå til [railway.app](https://railway.app)
2. Log ind med GitHub
3. Klik "New Project"
4. Vælg "Deploy from GitHub repo"
5. Vælg dit repository
6. Railway vil automatisk detektere Node.js og deploye

### 3. **Heroku (Alternativ - Gratis tier fjernet)**
1. Gå til [heroku.com](https://heroku.com)
2. Opret konto og log ind
3. Klik "New App"
4. Forbind til GitHub repository
5. Deploy automatisk

### 4. **Vercel (Alternativ - Gratis)**
1. Gå til [vercel.com](https://vercel.com)
2. Log ind med GitHub
3. Klik "New Project"
4. Vælg dit repository
5. Klik "Deploy"

## 🔄 Automatisk Deployment

GitHub Actions er konfigureret til automatisk at bygge appen når du pusher til `main` branch.

### Tjek GitHub Actions:
1. Gå til dit repository på GitHub
2. Klik "Actions" tab
3. Du vil se "Deploy to Render" workflow
4. Klik på workflow for at se build status

## 📱 App Features Live:
- ✅ Clock in/out funktionalitet
- ✅ Arbejdstid tracking og historik
- ✅ Mobile-responsive design
- ✅ Dansk interface
- ✅ In-memory storage (ingen database påkrævet)

## 🔗 Delbare Links:
Efter deployment kan du dele:
- **Hovedapp**: `https://din-app-url.com`
- **GitHub Repository**: `https://github.com/PhilipHov/tids-stempel-app`

## 🛠️ Troubleshooting:
- Hvis build fejler, tjek GitHub Actions logs
- Sørg for at alle environment variables er sat
- Verificer at `package.json` har korrekte scripts

## 📖 Næste Skridt:
1. Vælg en hosting service (Render anbefales)
2. Følg deployment instruktionerne
3. Del din live app URL med andre! 