var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var entityLocationRoomModel = new Schema({
    name: {type:String},
    isActive: {type:Boolean, default:true},
    entityLocationId:Schema.Types.ObjectId,
    facultyIds: [Schema.Types.ObjectId],
    enrollmentIds: [Schema.Types.ObjectId],
    maximumEnrollment: Number
});

module.exports = mongoose.model('EntityLocationRoom', entityLocationRoomModel);