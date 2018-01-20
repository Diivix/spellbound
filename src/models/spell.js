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

export default mongoose.model('spell');