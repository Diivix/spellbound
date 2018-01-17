var mongoose = require('mongoose');  
var users = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});
mongoose.model('User', users);
module.exports = mongoose.model('User');