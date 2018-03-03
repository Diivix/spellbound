import express from 'express';
import bodyParser from 'body-parser';
import user from '../models/user';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.json());

// LOGIN A SINGLE USER FROM THE DATABASE
router.post('/login', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        const err = new Error("There was a problem with your request.");
        err.status = 500;
        return next(err);
    }

    user.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            const err = new Error("Wrong email or password.");
            err.status = 401;
            return next(err);
        }

        req.session.user = user;
        return res.status(200).send();
    });
});

// LOGOUT A SINGLE USER
router.get('/logout', requireLogin, function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.status(200).send();
            }
        });
    }
});

// Test auth
router.post('/a', requireLogin, function (req, res) {
    return res.status(200).send("Blah!!!!");
});

export default router;