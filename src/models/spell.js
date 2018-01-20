import mongoose from 'mongoose';

var spells = new mongoose.Schema({  
  name: String,
  school: String,
  level: Number,
  classes: [String],
  castingTime: String,
  castingTimeDescription: String,
  range: String,
  rangeDescription: String,
  components: [String],
  duration: String,
  durationDescription: String,
  description: String,
  atHigherLevels: String
});
mongoose.model('spell', spells);
//module.exports = mongoose.model('Spell');
export default mongoose.model('spell');