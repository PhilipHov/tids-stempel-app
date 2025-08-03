# Opsætning af Tidssporing Projekt i Cursor

## Hurtig Import til Cursor

### 1. Download Projekt
- Download `tids-stempel-projekt.zip` fra dette Replit workspace
- Udpak zip filen på din lokale maskine

### 2. Åbn i Cursor
```bash
# Naviger til projektmappen
cd tids-stempel-projekt

# Installer dependencies
npm install

# Start development server
npm run dev
```

### 3. Environment Setup
Projektet kører uden eksterne dependencies:
- **Database**: Bruger in-memory storage automatisk
- **API Keys**: Ingen påkrævet for basic funktionalitet
- **Port**: Kører på localhost:5000

### 4. Kommandoer
```bash
npm run dev      # Development server (Vite + Express)
npm run build    # Build til production
npm run start    # Kør production version
npm run db:push  # Database migration (hvis nødvendig)
```

### 5. Projektstruktur
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Delte typer og schema
├── dist/           # Built filer (genereres af build)
└── build.sh        # Custom build script
```

### 6. Deployment Ready
Projektet er klar til deployment med:
- Build: `npm run build` 
- Start: `npm run start`
- Kræver kun DATABASE_URL environment variable for deployment

### 7. Features
- ✅ Clock in/out funktionalitet
- ✅ Arbejdstids tracking
- ✅ Mobil-responsive design
- ✅ Danish UI
- ✅ In-memory storage fallback
- ✅ Production-ready deployment