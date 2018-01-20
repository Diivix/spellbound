import config from './config';
import mongoose from 'mongoose';

mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.connection);

// Test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default db;