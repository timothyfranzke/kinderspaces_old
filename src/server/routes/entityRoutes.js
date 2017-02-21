var express = require('express');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
    function(token, done) {
        console.log(token);
    }
));
var routes = function(Entity){
    var entityRouter = express.Router();

    entityRouter.route('/Entity')
        .get(function(req, res)
        {
            Entity.find(req.query, function(err, entities){
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
            var entity = new Entity(req.body);
            entity.save();

            res.status(201).send(entity);
        });

    entityRouter.route('/Entity/:entityId')
        .get(function(req, res)
        {
            Entity.findById(req.params.entityId, function(err, entity){
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

    return entityRouter;
    };

module.exports = routes;