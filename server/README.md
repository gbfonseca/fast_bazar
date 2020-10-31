### Fast Bazar - Server

#### Backend for application of divulgation of bazars.

###### Status: Developing

    Technologies Used:
    NodeJS - V14.15.0
    Typescript
    Express
    Typeorm
    Postgres

For Test you need to create an ormconfig.json file with the following fields:

    {
      "type": "postgres",
      "host": (Your host),
      "port": (Your port),
      "username": (Your username),
      "password": (Your password),
      "database": "fast_bazar",
      "entities": [
        "./src/models/*.ts"
      ],
      "migrations": [
        "./src/database/migrations/*.ts"
      ],
      "cli": {
        "migrationsDir": "./src/database/migrations"
      }
    }

and install all dependencies with the follow command:

    npm install
      or
    yarn install

for running:

    npm run dev:server
      or
    yarn dev:server
