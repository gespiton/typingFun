const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  userEmail: {type: String, required: true},
  createAt: {type: Date, required: true, default: new Date()},
  keyStrokes: {type: Array, required: true},
  wpf: {type: Number, required: true},
  incorrect: {type: Number, required: true},
  total: {type: Number, required: true},
  timeSpent: {type: Number, required: true},
  articleId: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Record', recordSchema);
