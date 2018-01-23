const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: false },
  charNum: { type: Number, required: false },
  createAt: { type: Date, required: true, default: new Date() }
});
articleSchema.add({ sub: [articleSchema] });

module.exports = mongoose.model('article', articleSchema);