import mongoose from 'mongoose';
import { spells as spellsSchema } from './spell';
import { characters as charactersSchema } from './character';

// const favouritesSchema = new mongoose.Schema({
//   spells: [spellsSchema],
//   other: [{type: String}]
// });

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
  lastSignedIn: {
    type: Date,
    default: Date.now
  },
  favouriteSpells: [spellsSchema],
  characters: [charactersSchema]
});

export default mongoose.model('user', users);
