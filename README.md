# news-app

MEAN Stack for example news APP (project for learning).
Angular 7+, Angular Material, NodeJS, Express, Socket.io, Mongoose, Mongo and TypeScript.

## Getting Started

news-app it's extensible but simple app with MEAN stack. Built it for learning purpose, it has Socket.io messages communication and full API REST backend with Express.
In the front, it has two real views:

* **/news:** Listed new news (no archived, no deleted)
* **/news/archived:** Archived news

The functionality of the app is minimal, since the idea was to focus on the skeleton.
So nor session or user management are developed (sure you can contribute !)

### Prerequisites

The project is configured to be built as Docker containers, so [Docker](https://www.docker.com/) is requisite.
A docker-compose config file is in root.
All other dependencies are loaded by Docker inside containers.

```
Docker
```

### Exposed Ports

With Docker we expose services default ports to our machine:

* **Front:** 4200:4200
* **Back:** 3000:3000
* **DB:** 27017:27017

Configuration can be found in docker-compose.yml file.

### Installing

In Angular project you will find an enviroment config file that can be configurated:

```
angular-client/src/enviroments
```

In NodeJS project you will find an enviroment config file that can be configured too:

```
express-server/src/config/
```

After Docker is installed, you just 'build' the images with docker-compose and run the containers:

```
docker-compose build
docker-compose up
```

Sample data is loaded just once the first time you deploy the application.
This sample data is located in:

```
express-server/src/scripts/news.json
```

### Tasks

On the server side, you have grunt task configured for your use, take a look in: express-server/gruntfile.js

## Built With

* [Docker](https://www.docker.com/) - Deployment
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Angular 7+](https://angular.io/) - The web framework used
* [Angular Material](https://material.angular.io/) - Angular Material design
* [NodeJS](https://nodejs.org/es/) - Server
* [Express](https://expressjs.com) - Used for HTTP server and REST API
* [Socket.io](https://socket.io/) - WebSocket server communication (client and server)
* [Mongose](https://mongoosejs.com/)- Object Data Model (ODM) for MongoDB
* [MongoDB](https://www.mongodb.com) - Database
* [TypeScript](https://www.typescriptlang.org/) - Typescript progrmaming language
* [SCSS](https://sass-lang.com/) - Sass style language
* [Pug](https://pugjs.org) - Pug temlpate rendering

- All dependencies and libraries can be found in both projects package.json dependency file.

## Contributing

Several blogs articles, tutorials and documentation pages helped me to develop this app.
Those work must be recognized too.

## Versioning

1.0.0

## Authors

* **Juan Pons** - *Initial work* - [juanitopons](https://github.com/juanitopons)

Several blogs articles, tutorials and documentation pages helped me to develop this app.
Those work must be recognized too.

## License

Free to use project for learning purposes.2
