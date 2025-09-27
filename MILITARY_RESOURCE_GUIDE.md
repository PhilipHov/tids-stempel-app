# Militært Ressource Styringsværktøj

## 🎯 Oversigt

Dette værktøj giver dig mulighed for at styre militære ressourcer på tværs af kaserner i Danmark. Du kan se ressource mangler, allokere personel mellem kaserner, og planlægge udsendelser med træningskrav.

## 🗺️ Hovedfunktioner

### 1. Interaktivt Danmarkskort
- **Blå pins** markerer kaserner på kortet
- **Hover** over en kaserne for at se ressource status
- **Klik** på en kaserne for detaljerede oplysninger

### 2. Ressource Status
- **Rød badge**: Mangler personel (f.eks. "Mangler 3 SSG")
- **Gul badge**: For mange personel (f.eks. "For mange officerer")
- **Grøn badge**: Optimalt bemandet

### 3. Ressource Allokering
Når en kaserne mangler personel:

1. **Klik på "Alloker Ressourcer"** knappen i kaserne detaljer
2. **Se tilgængelige ressourcer** fra andre kaserner
3. **Vælg hvor mange** af hver type du vil overføre
4. **Se allokeringsplan** med prioritet og tidsestimat
5. **Godkend planen** for at starte overførslen

### 4. Udsendelse Planlægning
For personel der skal udsendes:

1. **Klik på "Planlæg Udsendelse"** ved relevant personel
2. **Se krav og kvalifikationer** der skal opfyldes
3. **Book træningsslots** (skydebane, føreruddannelse, etc.)
4. **Følg træningsplanen** med deadlines
5. **Bekræft booking** når planen er klar

## 🔧 Sidebar Funktioner

### Søgning
- Søg efter kaserne navn eller regiment
- Filtrer efter aktivitetstype og enhedstype
- Vælg specifik lokation

### Kalender
- Vælg dato for planlægning
- Se kommende træningsdatoer
- Planlæg ressource overførsler

### Oversigt
- **Totale kaserner**: 24
- **Mangler personel**: 8 kaserner
- **Optimalt bemandet**: 16 kaserner

## 📊 Kaserne Detaljer

### Oversigt Tab
- **Ressource status** med progress bars
- **Personel antal** og status
- **Kommende træning** og udsendelser
- **Frafaldsrisiko** indikatorer

### Personel Tab
- **Komplet personel liste** med rang og specialisering
- **Status indikatorer** (Aktiv, Træning, Udsendt, Orlov)
- **Frafaldsrisiko** for hvert personel
- **Planlæg udsendelse** knap for relevant personel

### Træning Tab
- **Kommende føreruddannelse** kurser
- **Deltagere** og datoer
- **Kapacitet** og ledige pladser

### Udsendelse Tab
- **Planlagte udsendelser** med datoer
- **Destinationer** og varighed
- **Personel** der skal udsendes

## 🎯 Ressource Allokering System

### Hvordan det virker:
1. **Identificer mangler**: Systemet viser hvilke ressourcer der mangler
2. **Find tilgængelige**: Systemet finder kaserner med overskydende ressourcer
3. **Beregn afstand**: Systemet viser afstand og overførslestid
4. **Prioriter**: Systemet foreslår optimal allokering
5. **Planlæg**: Systemet opretter tidsplan for overførsler

### Eksempel:
- **Aalborg Kaserne** mangler 3 SSG
- **Aarhus Kaserne** har 5 overskydende SSG
- **Systemet foreslår**: Overfør 3 SSG fra Aarhus til Aalborg
- **Estimeret tid**: 2 timer overførslestid
- **Prioritet**: Høj (grundet akut mangel)

## 🚀 Udsendelse Planlægning

### Krav System:
- **Skydebane**: Minimum 85% træfsikkerhed på 300m
- **Førstehjælp**: Militær traumabehandling
- **Føreruddannelse**: Taktisk ledelse kursus
- **Øvelser**: Urban warfare træning

### Booking System:
- **Skydebane slots**: 8-timers kursus
- **Føreruddannelse**: 40-timers intensivt kursus
- **Øvelsesdage**: 72-timers feltøvelse
- **Kapacitet**: Real-time ledige pladser

### Træningsplan:
1. **Prioriter krav** efter deadline
2. **Book slots** baseret på tilgængelighed
3. **Planlæg sekvens** (prerequisites først)
4. **Bekræft booking** for alle kurser
5. **Følg fremgang** med progress tracking

## 🎨 UI/UX Features

### Militær Design:
- **Mørk sidebar** med grå/sort farvetema
- **Blå accent farver** for militære elementer
- **Rød/gul/grøn** status indikatorer
- **Danske tekster** gennem hele systemet

### Responsive Design:
- **Desktop**: Fuldt kort med sidebar
- **Tablet**: Tilpasset layout
- **Mobil**: Kompakt visning

### Interaktive Elementer:
- **Hover effekter** på kort pins
- **Click handlers** for alle knapper
- **Modal dialogs** for detaljerede visninger
- **Progress bars** for status tracking

## 🔄 Data Flow

### Mock Data:
- **24 kaserner** fordelt over Danmark
- **Realistiske koordinater** for hver kaserne
- **Ressource data** med mangler og overskud
- **Personel data** med trænings- og udsendelsesplaner

### State Management:
- **React hooks** for lokal state
- **QueryClient** for data fetching
- **TypeScript** for type safety

## 🚀 Deployment

### Lokal Udvikling:
```bash
npm run dev
```

### Build:
```bash
npm run build
```

### Deploy til Netlify:
```bash
npm run build
# Upload dist/ folder til Netlify
```

## 📝 Fremtidige Forbedringer

### Phase 2:
- **Real-time data** fra militære systemer
- **Push notifikationer** for kritiske mangler
- **Automatisk allokering** baseret på algoritmer
- **Rapport generering** for ledelse

### Phase 3:
- **AI-powered** ressource optimering
- **Predictive analytics** for frafald
- **Integration** med andre militære systemer
- **Mobile app** tilgængelighed

## 🎯 Brugsscenarier

### Scenario 1: Akut Ressource Mangel
1. **Opgave**: Aalborg Kaserne mangler 5 SSG til næste uge
2. **Løsning**: 
   - Åbn ressource allokering
   - Find Aarhus Kaserne med 8 overskydende SSG
   - Planlæg overførsel af 5 SSG
   - Godkend plan med 2-timers overførslestid

### Scenario 2: Udsendelse Planlægning
1. **Opgave**: Lars Andersen skal udsendes til Afghanistan om 60 dage
2. **Løsning**:
   - Åbn udsendelse planlægning for Lars
   - Se krav: Skydebane, føreruddannelse, øvelse
   - Book skydebane kursus næste uge
   - Book føreruddannelse om 3 uger
   - Planlæg urban warfare øvelse om 6 uger
   - Bekræft komplet træningsplan

### Scenario 3: Ressource Optimering
1. **Opgave**: Optimer ressource fordeling på tværs af alle kaserner
2. **Løsning**:
   - Gennemgå alle kaserner med mangler
   - Identificer kaserner med overskud
   - Opret allokeringsplan for alle overførsler
   - Prioriter efter afstand og akuthed
   - Godkend komplet optimeringsplan

## 🏆 Fordele

### For Ledelse:
- **Real-time overblik** over alle ressourcer
- **Data-driven beslutninger** baseret på fakta
- **Automatiseret planlægning** reducerer manuel arbejde
- **Rapportering** giver indsigt i trends

### For Personel:
- **Klar træningsplan** før udsendelse
- **Transparent process** for ressource allokering
- **Bedre forberedelse** gennem struktureret træning
- **Reduceret stress** ved klar planlægning

### For Organisationen:
- **Optimeret ressource udnyttelse**
- **Reduceret mangel** gennem proaktiv planlægning
- **Forbedret readiness** gennem bedre træning
- **Kostbesparelser** gennem effektiv allokering

---

**🎖️ Dette værktøj giver dig den militære overlegenhed du har brug for til at styre ressourcer effektivt og forberede personel optimalt til udsendelse.**
