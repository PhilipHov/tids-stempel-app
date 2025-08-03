# Tids Stempel App 🕐

En dansk arbejdstid tracking app bygget med React og Express.js.

## 🚀 Hurtig Deployment

### Replit (Anbefalet - Gratis)
1. Gå til [replit.com](https://replit.com)
2. Opret en ny "Node.js" repl
3. Upload alle filer fra dette projekt
4. I "Secrets" tilføj:
   ```
   DATABASE_URL=postgresql://temp:temp@localhost:5432/temp
   NODE_ENV=production
   PORT=5000
   ```
5. Klik "Deploy" knappen
6. Din app er nu tilgængelig på: `https://din-repl-navn.din-username.replit.app`

### Vercel (Alternativ)
```bash
npm i -g vercel
vercel --prod
```

## 📱 Features
- ✅ Clock in/out funktionalitet
- ✅ Arbejdstid tracking og historik
- ✅ Mobile-responsive design
- ✅ In-memory storage (ingen database påkrævet)
- ✅ Dansk interface

## 🔧 Lokal Udvikling
```bash
npm install
npm run dev
```

## 📦 Build
```bash
npm run build
npm run start
```

## 🔗 API Endpoints
- `GET /api/work-status` - Nuværende arbejdsstatus
- `POST /api/clock-in` - Start arbejde
- `POST /api/clock-out` - Stop arbejde
- `GET /api/work-sessions` - Arbejdshistorik
- `GET /api/work-sessions/today` - Dagens arbejde

## 🛠️ Teknologier
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (med PostgreSQL support)
- **Deployment**: Replit, Vercel, Netlify 