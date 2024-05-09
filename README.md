# Node REST demo app

Demo project to practice Node + Typescript. It includes a REST API with operations to register and log users. By default, the application runs on port 3000 and the database runs on port 27017 (MongoDB default port)

## Instalation

Requirements: Node version 20.11 or higher, docker, docker-compose

1. Download the source code
2. Run `npm install` to install dependencies
3. Create a .env file with the variables from .env.template
4. Run `docker-compose up -d` to start MongoDB
4. Run `npm run dev` to start the project

## Usage

The available operations are documented in the root webpage. You can use a client such as Postman to send requests.