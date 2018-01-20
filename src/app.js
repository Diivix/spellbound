import express from 'express';
import db from './db';
import config from './config';
import userController from './controllers/userController';
import spellController from './controllers/spellController';

const app = express();
app.use('/api/users', userController);
app.use('/api/spells', spellController);

export default app;