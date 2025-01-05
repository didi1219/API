# API EventFlow

Installation du Projet : 


#1 Initialisation d'une base de donnée PostgreSQL sur Docker avec la commande suivante : 
=> docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=john -e POSTGRES_DB=projetDB -p 5432:5432 --rm -d postgres

#2 Dans le répertoire du projet, effectuer les commandes d'installer de package dans le terminal :

=> npm install devrait suffire mais si ce n'est pas le cas voici tous les pakages

=> npm i express
=> npm i -D nodemon
=> npm pkg set scripts.dev="nodemon server.js"
=> npm i pg
=> npm i express-promise-router
=> npm i dotenv
=> npm i vine
=> npm i argon2
=> npm i jsonwebtoken
=> npm i cors
=> npm i multer
=> npm i sharp
=> npm i uuid
=> npm i yup
=> npm i internal-ip@6.2.0
=> npm i --save-dev swagger-jsdoc
=> npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"
=> npm i winston
=> npm i morgan


#3 Initialisation de la base de donnée :

=> npm run initDB

#4 Lancement du projet : 

=> npm run dev
