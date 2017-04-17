const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/myuser',function (err,db) {
    if(err) throw err;
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

const User = mongoose.model('myuser', userSchema);

module.exports = User;
