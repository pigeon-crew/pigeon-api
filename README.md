# Pigeon Web

Web-app and API endpoints for Pigeon, a Chrome extension to make sharing links easy and fun.

## Setting Up

#### Installing Requirements

```bash
$ git clone https://github.com/pigeon-crew/pigeon-web.git
$ cd pigeon-web
$ yarn setup
```

#### Configuring Enviromental Variable

Create file called ".env.development" in root directory, it should look like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
```

Then, create another file called ".env" in "src/client", it should look like the following:

```
REACT_APP_API_URL="http://localhost:5000"
```

#### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```

## Code Tour

#### Root Directory

src/ -- This is where all of the backend + frontend source code lives

.env.development -- Your enviromental variables

.eslintignore -- Folders to be ignored by ESLint (i.e. the Client folder)

.eslintrc -- ESLint configurations (i.e. Lint according to Airbnb conventions)

.gitignore -- Folders to be ignored by Git

.prettierrc -- Prettier configurations

.package.json -- Node Packages

.Procfile -- File needed for Heroku deployment

tsconfig.json -- TypeScript configurations

yarn.lock -- Dependency file auto generated on "yarn install"

#### src/ Directory

client/ -- Web frontend using Create React App

middleware/ -- Middleware used by our API (i.e. authentication)

models/ -- Where our database models live (defined via Mongoose)

routes/ -- All of the important API and controller logic happens

types/ -- Custom type definition files for TypeScript compilation

utils/ -- Utility functions (i.e. Database connnection, email client, etc)

index.ts -- Main entry file for our server

## Key Concepts

#### Mono-Repo

This project is structured in a mono-repo architecture. This differs from the other alternative, where you have a standalone server and a standalone client. What this means is that our "Express" server will be serving both the API endpoints and the React frontend on the same port. In truth, this is probably not the best for scaling, but it's very easy to deploy.

In deployment, how it works is that Heroku will first install our Server dependencies, and then transpile the Server source code from TypeScript to CommonJS. Then, Heroku will go into our client directory, and install of its dependencies, and then build the client (compiling it from React source code to static HTML files). Finally, our Express server will then serve the compiled React file (which has now become static HTML) and the API endpoints.

#### JWT Authentication

This is probably one of most complex parts in the project. Essentially, rather than a session based authentication / authorization model, this project uses "stateless" JWT token authentication. The advantage of using JWT in this project is that it's more suited for long-live clients such as mobile apps and Chrome extension.

#### API

The API's in this projects are divided into three main groups.

User API - handling logic including Signup, Login, and Fetch Refresh Token
Friend API - handling logic including Send Friend Requests, Get Pending Requests, Accept / Reject Requests, and Get Current Friends
Link Sharing API - handling logic including Sending New Links, and Getting Links Sent to / by Me
