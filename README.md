# Pigeon Web

Web-app and API endpoints for Pigeon, a Chrome extension to make sharing links easy and fun.

## Setting Up

##### Installing Requirements

```bash
$ git clone https://github.com/pigeon-crew/pigeon-web.git
$ cd pigeon-web
$ yarn setup
```

##### Configuring Enviromental Variable

Create file called ".env.development" in root directory, it should look like the following:

```
ATLAS_URI=mongodb-connection-string-placeholder
JWT_SECRET=my-secret-jwt-key-placeholder
SENDGRID_API_KEY=sendgrid-api-key-placeholder
```

Then, create another file called ".env" in "src/client", it should look like the following:

```
REACT_APP_API_URL="http://localhost:5000"
```

##### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```
