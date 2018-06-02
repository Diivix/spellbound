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
        default: 0
    },
    class: {
        type: String,
        trime: true
    },
    description: {
        type: String,
        trim: true
    },
    dateCreated: {
        type: Date
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    spells: [spellsSchema]
});
