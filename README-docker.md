1. creo dockerfile
2. creo dockerfile ignore
3. docker build -t nestjs-mongo-tutorial-1 .
4. docker run -p 3000:3000 nestjs-mongo-tutorial-1

5. creo un dockerfile.prod per la produzione in cui si fa la build: 
docker build -t nestjs-mongo-tutorial-1-prod -f Dockerfile.prod .
6. docker run -p 3000:3000 nestjs-mongo-tutorial-1-prod

7. creo docker-compose per DEV
8. creo docker-compose per PROD

per lanciarlo:
docker-compose -f docker-compose.prod.yml up --build



docker compose up -d mongo_db