var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var entityModel = new Schema({
    name: {
        type:String
    },
    entityLocations:[Schema.Types.ObjectId]
});

module.exports = mongoose.model('Entity', entityModel);