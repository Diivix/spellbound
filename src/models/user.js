import mongoose from 'mongoose';

var users = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});
mongoose.model('user', users);

export default mongoose.model('user');