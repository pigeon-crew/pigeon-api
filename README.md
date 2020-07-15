# Pigeon Web

A boilerplate starter project for TypeScript, React, Express stack.

## Setting Up

##### Installing Requirements

```bash
$ git clone https://github.com/Orang-utan/ts-boilerplate.git
$ cd ts-boilerplate
$ yarn setup
```

##### Configuring Enviromental Variable

- Create file called ".env.development" in root directory
- Create new enviromental var: "ATLAS_URI=xxxxxxxxxxx"
- Create file called ".env" in "./src/client"
- Create new enviormental var: "REACT_APP_API_URL=http://localhost:5000"

##### Running Project

```bash
$ # run both server and client
$ yarn dev
$ # run server only
$ yarn server
$ # run client only
$ yarn client
```
