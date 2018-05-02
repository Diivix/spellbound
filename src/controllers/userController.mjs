import express from 'express';
import bodyParser from 'body-parser';
import user from '../models/user';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// READ
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
// TODO: Change this so you can only the requesting user's info and not any user's info.
// TODO: Remove password and sensative data from the response.
// router.get('/:id', requireLogin, function (req, res, next) {
//     user.findById(req.params.id, function (err, user) {
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
// router.post('/create', requireLogin, function (req, res, next) {
//     if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf) {
//         return res.status(500).send("There was a problem with your request.");
//     }

//     if (req.body.password !== req.body.passwordConf) {
//         return res.status(400).send("Passwords do not match.");
//     }

//     user.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     },
//         function (err, user) {
//             if (err) {
//                 const err = new Error("There was a problem adding the information to the database.");
//                 err.status = 500;
//                 return next(err);
//             }

//             return res.status(200).send("Congratulations!");
//         });
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
