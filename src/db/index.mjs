import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONNECTION);
// Test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

export default db;