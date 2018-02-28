import express from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo'
import db from './db';
import config from './config.json';
import user from './models/user';
import authController from './controllers/authController';
import userController from './controllers/userController';
import spellController from './controllers/spellController';

const app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

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
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    store: new store({
        mongooseConnection: db
    })
}));

// Auth - validate user if they already have a session
app.use(function (req, res, next) {
    if (req.session && req.session.user) {
        user.validate(req.session.user.email, function (error, user) {
            if (error || !user) {
                const err = new Error("Wrong email or password.");
                err.status = 401;
                return next(err);
            } 

            req.user = user;
            delete req.user.password; // delete the password from the session
            req.session.user = user;  //refresh the session value
            res.locals.user = user;
            return next();
        });
    } else {
        return next();
    }
});

// Define routes
app.use('/api/auth', authController);
app.use('/api/users', userController);
app.use('/api/spells', spellController);

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

export default app;
