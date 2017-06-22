const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  createAt: {type: Date, required: true, default: new Date()},
  status: {type: String, required: true, default: 'offline'}
});

module.exports = mongoose.model('User', userSchema);
