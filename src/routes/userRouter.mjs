import express from 'express';
import bodyParser from 'body-parser';
import user from '../models/user';
import bcrypt from 'bcrypt';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

const userInfoFields = 'username characters favouriteSpells lastSignedIn';

// READ
// RETURNS THE CURRENT USER FROM THE DATABASE, USING THEIR SESSION ID
router.post('/currentuser', requireLogin, function(req, res, next) {
  // const userId = req.session.user.id;
  user.findById(req.session.user._id, userInfoFields, function(err, user) {
    if (err) {
      const err = new Error('There was a problem finding your account.');
      err.status = 500;
      return next(err);
    }

    if (!user) {
      const err = new Error('No user found.');
      err.status = 404;
      return next(err);
    }

    return res.status(200).send(user);
  });
});

// RETURNS ALL THE USERS IN THE DATABASE
// router.get('/', requireLogin, function (req, res, next) {
//     user.find({}, function (err, users) {
//         if (err) {
//             const err = new Error("There was a problem finding the users.");
//             err.status = 500;
//             return next(err);
//         };
//         return res.status(200).send(users);
//     });
// });

// GETS A SINGLE USER FROM THE DATABASE
// router.get('/:id', requireLogin, function (req, res, next) {
//     user.findById(req.params.id, userInfoFields, function (err, user) {
//         if (err) {
//             const err = new Error("There was a problem finding the user.");
//             err.status = 500;
//             return next(err);
//         }

//         if (!user) {
//             const err = new Error("No user found.");
//             err.status = 404;
//             return next(err);
//         }

//         return res.status(200).send(user);
//     });
// });

// CREATE
// CREATES A NEW USER
// TODO: require authentication for this API
// router.post('/create', function(req, res, next) {
//   if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf) {
//     return res.status(500).send('There was a problem with your request.');
//   }

//   if (req.body.password !== req.body.passwordConf) {
//     return res.status(400).send('Passwords do not match.');
//   }

//   bcrypt.hash(req.body.password, 10, function(err, hash) {
//     if (err) {
//       return next(err);
//     }

//     user.create(
//       {
//         username: req.body.username,
//         email: req.body.email,
//         password: hash,
//         lastSignedIn: Date.now()
//       },
//       function(err, user) {
//         if (err) {
//           const err = new Error('There was a problem adding the information to the database.');
//           err.status = 500;
//           return next(err);
//         }

//         return res.status(200).send('Congratulations!');
//       }
//     );
//   });
// });

// UPDATE
// UPDATES A SINGLE USER IN THE DATABASE
// router.put('/:id', requireLogin, function (req, res, next) {

//     user.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
//         if (err) {
//             const err = new Error("There was a problem updating the user.");
//             err.status = 500;
//             return next(err);
//         }

//         return res.status(200).send(user);
//     });
// });

// DELETE
// DELETES A USER FROM THE DATABASE
// router.delete('/:id', requireLogin, function (req, res, next) {
//     user.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) {
//             const err = new Error("There was a problem deleting the user.");
//             err.status = 500;
//             return next(err);
//         }

//         return res.status(200).send("User was deleted!");
//     });
// });

export default router;
