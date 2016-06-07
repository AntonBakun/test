/**
 * Created by BAKUN on 07.06.2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    role: String,
    bonus: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);