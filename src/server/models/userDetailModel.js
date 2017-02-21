var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userDetailModel = new Schema({
    userId : {type:Schema.Types.ObjectId},
    suffix: String,
    dateOfBirth: Date,
    employer: String,
    occupation: String,
    addresses:[
        {
            isPrimary:Boolean,
            addressLineOne:String,
            addressLineTwo:String,
            state:String,
            city:String,
            zip:Number
        }
    ],
    phones:[
        {
            isPrimary:Boolean,
            phoneNumber:String,
            phoneType:String
        }
    ],
    notes:[String],
    allergies:[String],
    childId:{type:Schema.Types.ObjectId},
    parentId:{type:Schema.Types.ObjectId},
    partnerId:{type:Schema.Types.ObjectId},
    emergencyContact:[
        {
            firstName:String,
            lastName:String,
            phoneNumber:String,
            phoneType:String,
            relationShip:String
        }
    ],
    enrollment:{
        roomId:{type:Schema.Types.ObjectId},
        locationId:{type:Schema.Types.ObjectId},
        entityId:{type:Schema.Types.ObjectId}
    },
    assignment:{
        roomId:{type:Schema.Types.ObjectId},
        locationId:{type:Schema.Types.ObjectId},
        entityId:{type:Schema.Types.ObjectId}
    }
});

module.exports = mongoose.model('UserDetail', userDetailModel);