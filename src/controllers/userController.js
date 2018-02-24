import express from 'express';
import bodyParser from 'body-parser';
import user from '../models/user';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

// READ
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    user.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    user.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// CREATE
// CREATES A NEW USER
router.post('/create', function (req, res) {
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf) {
        return res.status(500).send("There was a problem with your request.");
    }

    if (req.body.password !== req.body.passwordConf) {
        return res.status(400).send("Passwords do not match.");
    }

    user.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConf: req.body.passwordConf
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            // TODO: Redirect here...
            res.status(200).send("Congratulations!");
        });
});

// UPDATE 
// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {

    user.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

// DELETE
// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    user.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User was deleted.");
    });
});

// AUTH
// AUTHENTICATES A SINGLE USER FROM THE DATABASE
router.post('/auth', function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(500).send("There was a problem with your request.");
    }

    user.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            return res.status(401).send("Wrong email or password.");
        }

        req.session.userId = user._id;
        // TODO: Redirect here...
        res.status(200).send("Logged in!");
    });
});

// LOGOUTS A SINGLE USER
router.get('/auth', function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) return res.status(500).send("There was a problem with your request.");
            res.status(200).send("Logged out!");
        });
    }
});

export default router;