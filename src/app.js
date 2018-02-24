import express from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo'
import db from './db';
import config from './config';
import userController from './controllers/userController';
import spellController from './controllers/spellController';

const app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//use sessions for tracking logins
const store = mongoStore(session);
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new store({
        mongooseConnection: db
    })
}));

// Define routes
app.use('/api/users', userController);
app.use('/api/spells', spellController);

export default app;