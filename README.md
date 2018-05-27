# Overview

Epxress API for the spellbound-react application.

Watch mongo-connect issue with destroying a session, this only affects new version of MongoDB:

- <https://github.com/jdesboeufs/connect-mongo/issues/277>

- <https://github.com/jdesboeufs/connect-mongo/pull/282>

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

1. The db is hosted at <https://mlab.com/>
2. the application is hosted at <https://zeit.co>

## Used Tutorials and Libraries

- [Using ES6](https://www.codementor.io/iykyvic/writing-your-nodejs-apps-using-es6-6dh0edw2o)
- [ES6 Modules](https://medium.com/@giltayar/native-es-modules-in-nodejs-status-and-future-directions-part-i-ee5ea3001f71)
- [Express and React](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)
- [Https with Express](https://medium.com/@nileshsingh/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e)
- [Redux with TypeScript (alternative)](https://levelup.gitconnected.com/react-and-redux-with-typescript-da0c37537a79) - Redux implementation was borrowed from this.
- [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) - Used for the client router.

## TODO

- Add TypeScript to client project.
- Add materials to Spells! Somehow these got left out.
- Move menu to it own header component. The menu shouldn;t be shown on the signin page.
- Fix bug with sorting of the ranges filter.
- Idealy once we load all the lightSpells, we shouldn't go back to the database everytime to apply a filter. We should use the redux store, copy the lightSpells, and apply to the filters to the copy.
- Fix the any types for the functioned used in the SpellModal.
