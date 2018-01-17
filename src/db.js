var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.connection, { useMongoClient: true });

// Test connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));