# Overview

Epxress API for the spellbound-react application.

Watch mongo-connect issue with destroying a session, this only affects new version of MongoDB:

- <https://github.com/jdesboeufs/connect-mongo/issues/277>

- <https://github.com/jdesboeufs/connect-mongo/pull/282>

## Development

### Running locally

1. Run `yarn start`
2. Form the spellbound-api project, run `dotnet run`

### Running in Docker

1. `yarn build`
2. `docker build --rm -f Dockerfile -t spellbound .`
3. `docker run --rm -d -p 80:80 spellbound`. NOw navigate to localhost:80
4. `docker container list`
5. `docker container stop {{container_id}}`

### Setup SSL Cert

1. Generate cert:

``` bash
openssl genrsa -out localhost.key 2048
openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost
```

2. Place in certificates folder of project
3. Import the genrated certificate into your browser/system.

## Deployment using Azure Containers

- [Deploy Continer as Azure App Service](https://blogs.msdn.microsoft.com/premier_developer/2018/06/15/container-why-not-app-services/)
- [Deploy a container application](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-tutorial-deploy-app)
- [Deploy multi container instance](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-multi-container-yaml)

## Used Tutorials and Libraries

- [Using ES6](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o)
- [ES6 Modules](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71)
- [Express and React](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
- [Https with Express](https://medium.com/@nileshsingh/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e)
- [Redux with TypeScript (alternative)](https://levelup.gitconnected.com/react-and-redux-with-typescript-da0c37537a79) - Redux implementation was borrowed from this.
- [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) - Used for the client router.
- [Run with Docker and NGINX](https://medium.com/yld-engineering-blog/deploy-your-create-react-app-with-docker-and-ngnix-653e94ffb537)

## TODO

- BUG: Spell filters. Mage Hand should appear when filtering on class 'Wizard' and school 'Conjuration', but it doesn't. It looks like all spells with more than one class are removed, leaving spells with only a wizard class.
- Move menu to it own header component. The menu shouldn;t be shown on the signin page.
- Fix bug with sorting of the ranges filter.
- Allow user to upload character avatar
- Need to handle errors better on login page and when loading failures happen on other pages.
- Refresh the session expirery date of the JWT when we ever the user hits the api/database.
- Fix spell popup buttons.
- Fix spell filters menu.
- Need to add checks for characters, {insert others, here}, to periodically update data. I.e. character data.
- Look at adding the reference property as a filter. May need to spilt out the property into pageReference and bookReference.
- Characters are not displaying as a list down the page instead of accross.
