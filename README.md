1. Lancio comando: pnpm i @nestjs/mongoose mongoose
2. Installare e fare setup DB MongoDB 
### Definire la struttura del documento MongoDB in modo dichiarativo (TypeScript-first)
3. Creare Schema per MongoDB collections (non è un modulo)
4. creo modulo users e importo lo schema creato nel punto 3
5. creo service dentro modulo users
6. creo Dto per createUser
7. faccio le api rest di patch, delete
8. Creo user-settings (serve per la One to Many) e lo importo in user.module


pnpm i class-validator class-transformer

7. creo Controller User e definisco la creazione dello users
8.   app.useGlobalPipes(new ValidationPipe()); in main.ts  per imporre che c'è una validazione degli oggetti in ingresso per ogni endpoints
9. Creo GetAll e GetOne