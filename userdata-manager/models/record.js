const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  user: {type: Schema.Types.Mixed, required: true},
  createAt: {type: Date, required: true, default: new Date()},
  data: {type: Array, required: true},
  articleId: {type: Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Record', recordSchema);
