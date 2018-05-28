import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { spells as spellsSchema } from './spell';
import { characters as charactersSchema } from './character';

const favouritesSchema = new mongoose.Schema({
  spells: [spellsSchema]
});

const users = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  favourites: favouritesSchema,
  characters: [charactersSchema]
});

// Hashing a password before saving it to the database
users.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

export default mongoose.model('user', users);
