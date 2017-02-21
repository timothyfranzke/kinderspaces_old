var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: {type:String},
    lastName : {type:String, default:"Franzke"},
    password: {type:String},
    username : {type:String},
    passwordHash : {type:String},
    joinDate : {type:Date, default:Date.Now},
    emailConfirmed: Boolean,
    accountLocked: {type:Boolean, default:false},
    passwordAttempt:{type:Number, default:0},
    roles:[String]
});

module.exports = mongoose.model('User', userModel);