import mongoose from 'mongoose';

var spells = new mongoose.Schema({  
  name: { type: String, lowercase: true },
  school: { type: String, lowercase: true },
  level: Number,
  classes: [{ type: String, lowercase: true }],
  castingTime: { type: String, lowercase: true },
  castingTimeDescription: { type: String, lowercase: true },
  range: { type: String, lowercase: true },
  rangeDescription: { type: String, lowercase: true },
  components: [{ type: String, lowercase: true }],
  duration: { type: String, lowercase: true },
  durationDescription: { type: String, lowercase: true },
  description: String,
  atHigherLevels: String
});
mongoose.model('spell', spells);

export default mongoose.model('spell');