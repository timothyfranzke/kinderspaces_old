var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var entityLocationModel = new Schema({
    name: {type:String},
    addressLineOne: {type:String},
    addressLineTwo: {type:String},
    city:{type:String},
    state:{type:String},
    zip:{type:Number},
    maximumEnrollment:{type:Number},
    entityId:Schema.Types.ObjectId,
    hours:[{
        dayOfWeek:{type:String},
        openTime:{type:String},
        endTime:{type:String},
        isClosed:Boolean
    }]
});

module.exports = mongoose.model('EntityLocation', entityLocationModel);