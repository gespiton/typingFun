const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sub: [{
        text: String,
        charNum: Number
    }
    ]
});
// db.articles.find({"sub._id":ObjectId("592a3a1aa0a7db1c2256fdd2")},{'sub.$':true})
module.exports = mongoose.model('article', articleSchema);