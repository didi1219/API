# Projet Mobile - Installation et Lancement de l'API 

## Pré-requis  
- [Docker](https://www.docker.com/)  
- [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/)  
- [API Repository](https://github.com/didi1219/API) 

---

## Installation de l'API  

### 1. Initialisation d'une base de données PostgreSQL avec Docker  
Exécutez la commande suivante dans votre terminal pour créer et démarrer une instance PostgreSQL :  

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=john -e POSTGRES_DB=projetDB -p 5432:5432 --rm -d postgres
```
### 2. Installation des dépendances
Dans le répertoire du projet, exécutez les commandes suivantes pour installer les packages nécessaires :
```bash
npm i express
npm i -D nodemon
npm pkg set scripts.dev="nodemon server.js"
npm i pg
npm i express-promise-router
npm i dotenv
npm i vine
npm i argon2
npm i jsonwebtoken
npm i cors
npm i multer
npm i sharp
npm i uuid
npm i yup
npm i internal-ip@6.2.0
npm i --save-dev swagger-jsdoc
npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"
npm i winston
npm i morgan
```

### 3. Initialisation de la base de données
Une fois les dépendances installées, initialisez la base de données en exécutant :
```bash
npm run initDB
```

### 4. Lancement de l'API
Démarrez le projet en mode développement avec la commande :
```bash
npm run dev
```
