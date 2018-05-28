import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import user from '../models/user';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.json());

// LOGIN A SINGLE USER FROM THE DATABASE
router.post('/signin', function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    const err = new Error('There was a problem with your request.');
    err.status = 500;
    return next(err);
  }

  user.findOne({ email: req.body.email }).exec(function(error, user) {
    if (error || !user) {
      const err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
    }

    bcrypt.compare(req.body.password, user.password, function(error, result) {
      if (error || !result) {
        const err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.user = user;
        return res.status(200).send();
      }
    });
  });
});

// LOGOUT A SINGLE USER
router.get('/signout', requireLogin, function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(error) {
      if (error) {
        return next(error);
      } else {
        return res.status(200).send();
      }
    });
  }
});

export default router;
