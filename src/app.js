var express = require('express');
var db = require('./db');
var config = require('./config');
var userController = require('./controllers/userController');

var app = express();
app.use('/users', userController);
module.exports = app;