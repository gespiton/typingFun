const mongoose = require('mongoose');

const article = new mongoose.Schema({
  name: {type: String, required: true},
  text: {type: String, required: false},
  charNum: {type: Number, required: false},
  createAt: {type: Date, required: true, default: Date.now},
  sub: {type: Array, required: false}
});


module.exports = mongoose.model('article', article);