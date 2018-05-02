# Overview

Epxress API for the spellbound-react application.

Watch mongo-connect issue with destroying a session, this only affect snew version of MongoDB:

- https://github.com/jdesboeufs/connect-mongo/issues/277

- https://github.com/jdesboeufs/connect-mongo/pull/282

## Development

### Setup SSL Cert

1. Generate cert:

``` bash
openssl genrsa -out localhost.key 2048
openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost
```

2. Place in certificates folder of project
3. Import the genrated certificate into your browser/system.

## Hosting

1. The db is hosted at https://mlab.com/
2. the application is hosted at https://zeit.co

## Used Tutorials

- https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o
- https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71

## TODO:

- Cannot log in to web api on dev server.