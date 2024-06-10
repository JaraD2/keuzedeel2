# How to use this notes app
first clone the repo using github desktop /  something else
go to the folder where the project is located and open the command line and run
```sh
npm install
npx prisma migrate
```
after that
```sh
npm run dev
```
to open the development build or use
```sh
npm run build
```
to build the project and then 
```sh
npm run start
```
you will need to make your own database and connect to it
in your .env file you need to have the following line
```.env
DATABASE_URL="mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE_NAME}"
```
this is using mysql if you have a database using something else look for support here
https://www.prisma.io/docs/orm/reference/connection-urls

If it prisma gives an error saying it needs permissions to make a shadow database look for support here
https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database
