# MEAN dockerized app

## Getting started
****

  ```
  git clone 
  cd mean-docker-app
  docker-compose  up
  ```

  It will run fronend `http://localhost:4200`  and api on `http://localhost:3000`.

## About Project

This is a simple web application developed with MEAN stack with the funcionallities of user registration, login page and a profile. Developed with Angular 10.0.5 for the frontend, ExpressJs as a rest api and using Mongo as database.

Also, developed using Auth guard with tokenized services, http interceptors and services wich are secured using JWT.

The project is dockerized and using docker-compose to manage the three docker containers: jp_users_api, jp_users_frontend and jp_users_mongo.

Folder structure:
- Api: ExpressJs api
- Frontend: Angular app
- Mongo: database files
