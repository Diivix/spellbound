import express from 'express';
import bodyParser from 'body-parser';
import user from '../models/user';
import { requireLogin } from '../utils/auth';

const router = express.Router();
router.use(bodyParser.json({ limit: '5mb' }));
router.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

const userInfoFields = 'username characters favourites';

// Note, this controller does not write to a character collection in the database. It writes to the user
// collection. The controller has been separated out into it's own for simplicity away from the core user routes.

// CREATE
// CREATE A NEW CHARACTER
router.post('/create', requireLogin, function(req, res, next) {
  if (!req.body.name) {
    return res.status(500).send('A character "name" is required.');
  }

  user.findById(req.session.user._id, function(err, user) {
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

    const dateCreated = Date.now();
    const dateLastModified = Date.now();
    // TODO: Need add handeling for optional properties
    user.characters.push({
      name: req.body.name,
      level: req.body.level,
      classType: req.body.classType,
      description: req.body.description,
      dateCreated: dateCreated,
      dateLastModified: dateLastModified,
      spells: req.body.spells
    });

    user.save(function(err) {
      if (err) {
        const err = new Error('There was a problem creating your character.');
        err.status = 500;
        return next(err);
      }

      return res.status(200).send(user);
    });
  });
});

// READ
// As characters are sub documents of the user model. Reads are done through the userController.

// UPDATE
// UPDATE A CHARACTER
router.put('/update', requireLogin, function(req, res, next) {
  if (!req.body.id) {
    return res.status(500).send('A Character ID must be specified.');
  }

  user.findById(req.session.user._id, function(err, user) {
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

    let character = user.characters.id(req.body.id);
    character.name = req.body.name;
    character.classType = req.body.classType;
    character.level = req.body.level;
    character.description = req.body.description;
    character.dateLastModified = Date.now();

    user.save(function(err) {
      if (err) {
        const err = new Error('There was a problem updating your character.');
        err.status = 500;
        return next(err);
      }
      return res.status(200).send(user);
    });
  });
});

// DELETE
// REMOVE A CHARACTER
router.delete('/delete', requireLogin, function(req, res, next) {
  if (!req.body.characterId) {
    return res.status(500).send('A Character ID must be specified.');
  }

  user.findById(req.session.user._id, function(err, user) {
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

    // Remove the character
    user.characters.pull(req.body.characterId);

    user.save(function(err) {
      if (err) {
        const err = new Error('There was a problem removing your character.');
        err.status = 500;
        return next(err);
      }

      return res.status(200).send(user);
    });
  });
});

// REMOVE A SPELL FROM A CHARACTER
router.delete('/delete/spell', requireLogin, function(req, res, next) {
  // Note, this is the id from the character document, not the id from the spell collection.
  if (!req.body.spellId) {
    return res.status(500).send('A Spell ID must be specified.');
  }
  // TODO: Fill this out.
});

export default router;
