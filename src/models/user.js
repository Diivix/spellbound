import mongoose from 'mongoose';

var users = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});
mongoose.model('user', users);
//module.exports = mongoose.model('User');
export default mongoose.model('user');