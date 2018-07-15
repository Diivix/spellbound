import mongoose from 'mongoose';

export const spells = new mongoose.Schema({
  name: { type: String, lowercase: true, required: true, trim: true },
  school: { type: String, lowercase: true, required: true, trim: true },
  level: { type: Number, required: true },
  classTypes: [{ type: String, lowercase: true, required: true, trim: true }],
  castingTime: { type: String, lowercase: true, required: true, trim: true },
  castingTimeDescription: { type: String, lowercase: true, trim: true },
  range: { type: String, lowercase: true, required: true, trim: true },
  rangeDescription: { type: String, lowercase: true, trim: true },
  components: [{ type: String, lowercase: true, required: true, trim: true }],
  duration: { type: String, lowercase: true, trim: true },
  durationDescription: { type: String, lowercase: true },
  materials: { type: String, trim: true },
  description: { type: String, required: true },
  atHigherLevels: { type: String, required: true }
});

export default mongoose.model('spell', spells);
