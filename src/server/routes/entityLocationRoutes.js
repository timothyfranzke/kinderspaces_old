var express = require('express');

var routes = function(EntityLocation, EntityLocationRoom, User){
    var entityRouter = express.Router();

    entityRouter.route('/Entity/:entityId/EntityLocation')
        .get(function(req, res)
        {
            var entityId = req.params.entityId;
            console.log(entityId);
            var query = { 'entityId':entityId};
            EntityLocation.find(query, function(err, entities){
                if (err)
                {
                    res.status(500).send(err)
                }
                else{
                    res.json(entities);
                }
            });
        })
        .post(function(req, res){
            var entityLocation = new EntityLocation(req.body);
            entityLocation.entityId = req.params.entityId;
            entityLocation.save();

            res.status(201).send(entityLocation);
        });

    entityRouter.route('/EntityLocation/:entityLocationId')
        .get(function(req, res)
        {
            EntityLocation.findById(req.params.entityLocationId, function(err, entity){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(entity);
            });
        })
        .put(function(req, res){
            EntityLocation.findById(req.params.entityLocationId, function (err, entity) {
                if (err) return handleError(err);
                var updatedEntityLocation = new EntityLocation(req.body);
                entity.name= updatedEntityLocation.name;
                entity.addressLineOne= updatedEntityLocation.addressLineOne;
                entity.addressLineTwo= updatedEntityLocation.addressLineTwo;
                entity.city=updatedEntityLocation.city;
                entity.state=updatedEntityLocation.state;
                entity.zip=updatedEntityLocation.zip;
                entity.maximumEnrollment=updatedEntityLocation.maximumEnrollment;
                for(var i in  entity.hours)
                {
                    entity.hours[i].dayOfWeek = updatedEntityLocation.hours[i].dayOfWeek;
                    entity.hours[i].openTime = updatedEntityLocation.hours[i].openTime;
                    entity.hours[i].endTime = updatedEntityLocation.hours[i].endTime;
                    entity.hours[i].isClosed = updatedEntityLocation.hours[i].isClosed;
                }

                entity.save(function (err, updatedEntity) {
                    if (err) return handleError(err);
                    res.send(updatedEntity);
                });
            });
        })
        .delete(function(req,res){

        });

    entityRouter.route('/EntityLocation/:entityLocationId/enrollment')
        .get(function(req, res)
        {
            var returnEnrollmentUsers = function(err, users){
                if(err)
                    res.status(500).send(err);
                else
                {
                    res.json(users);
                }
            };
            var enrollmentUsers = function(err, users){
                if(err)
                    res.status(500).send(err);
                else {
                    var userIds = [];
                    users.forEach(function(item){
                        userIds = userIds.concat(item.enrollmentIds)
                    });
                    User.find({'_id': {$in: userIds}
                    }, function(err, users){returnEnrollmentUsers(err, users)});
                }
            };
            EntityLocationRoom.find({"entityLocationId":req.params.entityLocationId}, function(err, users){enrollmentUsers(err, users)});
        });

    entityRouter.route('/EntityLocation/:entityLocationId/assignment')
        .get(function(req, res)
        {
            var returnEnrollmentUsers = function(err, users){
                if(err)
                    res.status(500).send(err);
                else
                {
                    console.log(users);
                    res.json(users);
                }
            };
            var enrollmentUsers = function(err, entity){
                if(err)
                    res.status(500).send(err);
                else {
                    console.log(JSON.stringify(entity));
                    var facultyIds = [];
                    entity.forEach(function(item){
                        facultyIds = facultyIds.concat(item.facultyIds)
                    });
                    User.find({_id: {$in: facultyIds}
                    }, function(err, users){returnEnrollmentUsers(err, users)})
                }
            };
            EntityLocationRoom.find({"entityLocationId":req.params.entityLocationId}, function(err, entity){enrollmentUsers(err, entity)});
        });
    return entityRouter;
};

module.exports = routes;