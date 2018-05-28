import { spells as spellsSchema } from './spell';
import mongoose from 'mongoose';

export const characters = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
    },
    class: {
        type: String,
        trime: true
    },
    description: {
        type: String,
        trim: true
    },
    spells: [spellsSchema]
});
