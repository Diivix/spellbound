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
      class: req.body.class,
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
  if (!req.body.characterId) {
    return res.status(500).send('A Character ID must be specified.');
  }
  // TODO: Need add handeling for optional properties
  user.findOneAndUpdate(
    { _id: req.session.user._id, 'character._id': characterId },
    {
      $set: {
        'name.$': req.body.name,
        'level.$': req.body.level,
        'class.$': req.body.class,
        'description.$': req.body.description,
        'dateLastModified.$': Date.now()
      }
    },
    function(err, doc) {
      if (err) {
        const err = new Error('There was a problem finding your account.');
        err.status = 500;
        return next(err);
      }

      return res.status(200).send(user);
    }
  );
});

// DELETE
// REMOVE A CHARACTER
router.delete('/remove', requireLogin, function(req, res, next) {
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
    user.characters.pull(characterId);

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
router.delete('/remove/spell', requireLogin, function(req, res, next) {
  // Note, this is the id from the character document, not the id from the spell collection.
  if (!req.body.spellId) {
    return res.status(500).send('A Spell ID must be specified.');
  }
  // TODO: Fill this out.
});

export default router;
