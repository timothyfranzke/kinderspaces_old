var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    nodeName : String,
    nodeDescription : String,
    nodeNumber : Number
});

module.exports = mongoose.model('User', userModel);