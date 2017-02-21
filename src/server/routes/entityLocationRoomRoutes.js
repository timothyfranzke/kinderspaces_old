var express = require('express');

var routes = function(EntityLocationRoom, UserDetail){
    var entityRouter = express.Router();

    entityRouter.route('/EntityLocation/:entityLocationId/EntityLocationRoom')
        .get(function(req, res)
        {
            var query = { "entityLocationId":req.params.entityLocationId};
            EntityLocationRoom.find(query, function(err, entities){
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
            var entityLocationRoom = new EntityLocationRoom(req.body);
            entityLocationRoom.entityLocationId = req.params.entityLocationId;
            entityLocationRoom.save();

            res.status(201).send(entityLocationRoom);
        });

    entityRouter.route('/EntityLocationRoom/:entityLocationRoomId')
        .get(function(req, res)
        {
            EntityLocationRoom.findById(req.params.entityLocationRoomId, function(err, entity){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(entity);
            });
        })
        .put(function(req, res){
            console.log("posted");
        })
        .delete(function(req,res){

        });
    entityRouter.route('/EntityLocationRoom/:entityLocationRoomId/enrollment')
        .get(function(req, res)
        {
            UserDetail.find({"enrollment.roomId":req.params.entityLocationRoomId}, function(err, users){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(users);
            });
        })

        .put(function(req, res){
            console.log("posted");
        })
        .delete(function(req,res){

        });
    entityRouter.route('/EntityLocationRoom/:entityLocationRoomId/enrollment/:userId')
        .post(function(req,res){
            EntityLocationRoom.findById(req.params.entityLocationRoomdId, function(err, entity){
                if(err)
                    res.status(500).send(err);
                else
                {
                    if (entity.maximumEnrollment > entity.enrollment.length)
                    {
                        entity.enrollment.add(req.params.userId);
                        entity.save();
                        UserDetail.findById(req.params.userId, function(err, user){
                            if(err)
                                res.status(500).send(err);
                            else
                            {
                                user.enrollment.roomId = req.params.entityLocationRoomId;
                                user.save();
                            }
                        })
                    }
                    else
                    {
                    }
                }
            })
        })
        .delete(function(req,res){

        });
    entityRouter.route('/EntityLocationRoom/:entityLocationRoomId/assignment/:userId')
        .post(function(req,res){
            EntityLocationRoom.findById(req.params.entityLocationRoomId, function(err, entity){
                if(err)
                    res.status(500).send(err);
                else
                {
                    console.log(JSON.stringify(entity));
                    if (true)
                    {
                        entity.facultyIds.push(req.params.userId);
                        entity.save();
                        UserDetail.findOne({"userId":req.params.userId}, function(err, user){
                            if(err)
                                res.status(500).send(err);
                            else
                            {
                                if(user.assignment == undefined)
                                    user.assignment = {};
                                user.assignment.roomId = req.params.entityLocationRoomId;
                                user.save();
                                res.json(user);
                            }
                        })
                    }
                    else
                    {

                    }
                }
            })
        })
        .delete(function(req,res){

        });

    return entityRouter;
};

module.exports = routes;