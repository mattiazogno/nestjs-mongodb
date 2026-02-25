# NestJS + MongoDB - API Utenti & Ordini (Esempio Realistico)

API RESTful con **NestJS 10+** e **MongoDB** (tramite `@nestjs/mongoose`) che gestisce:

- Utenti con impostazioni (1:1 embedded) e lista di post (1:N embedded)
- Ordini (relazione 1:N **referenced** → ogni ordine punta a un utente)

Progetto didattico / starter con:

- Validazione DTO solida (class-validator + class-transformer)
- Gestione errori coerente
- Popolamento relazioni virtuali
- Configurazione ambiente type-safe
- Best practice di modularità NestJS

## Struttura principali relazioni dati

| Entità          | Relazione          | Tipo implementato     | Perché questa scelta?                                                                                   | Alternative possibili & quando usarle                                      |
|-----------------|--------------------|------------------------|----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| User → Settings | **1:1**            | **Embedded**           | Dati sempre letti insieme all'utente<br>Dimensione piccola e fissa<br>Aggiornamenti atomici facili     | Riferimento solo se settings cresce molto o ha vita propria indipendente     |
| User → Posts    | **1:N** (one-to-few) | **Embedded** (array)   | Post considerati "parte" dell'utente<br>Pochi per utente (non cresce indefinitamente)<br>Lettura frequente insieme | Riferimento se: >50–100 post/utente, ricerca full-text complessa sui post, CRUD post indipendente |
| User → Orders   | **1:N** (one-to-many)| **Referenced** (virtual populate) | Ordini possono essere **molti**<br>Hanno ciclo di vita autonomo<br>Vengono interrogati separatamente spesso | Embedding solo se ordini sono pochissimi e sempre letti con l'utente          |

**Regola empirica usata in questo progetto** (allineata con le linee guida MongoDB 2024–2025):

- **Embed** quando: one-to-few, dati letti insieme >90% delle volte, dimensione < ~100 elementi
- **Reference** quando: one-to-many con crescita potenzialmente alta, accesso indipendente frequente, update separati importanti

## Requisiti

- Node.js ≥ 18
- pnpm ≥ 8 (raccomandato) o npm/yarn
- MongoDB ≥ 6.x (locale o Atlas)

## Installazione rapida

```bash
# 1. Clona il repository
git clone <tuo-repo>
cd <tuo-repo>

# 2. Installa dipendenze
pnpm install
# oppure: npm install

# 3. Crea file di ambiente
cp .env.example .env.development
# modifica MONGODB_URI se necessario

# 4. Avvia (modalità watch)
pnpm start:dev