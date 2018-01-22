const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {type: String, required: true},
  sub: [{
    text: String,
    charNum: Number
  }
  ],
  createAt: {type: Date, required: true, default: new Date()}
});

module.exports = mongoose.model('article', articleSchema);