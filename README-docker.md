1. creo dockerfile per ambiente dev
2. creo dockerfile ignore
3. docker build -t nestjs-mongo-tutorial-1 .
4. docker run -p 3000:3000 nestjs-mongo-tutorial-1 (se voglio lanciarlo inline, ma si usa il compose)

5. creo un dockerfile.prod per la produzione in cui si fa la build: 
docker build -t nestjs-mongo-tutorial-1-prod -f Dockerfile.prod .
6. docker run -p 3000:3000 nestjs-mongo-tutorial-1-prod (se voglio lanciarlo inline, ma si usa il compose)

7. creo docker-compose per DEV
8. creo docker-compose per PROD

per lanciarlo:
docker-compose -f docker-compose.prod.yml up --build

ATTENZIONE:
I docker-compose passano gli env 

docker compose up -d mongo_db