var express = require('express');

var routes = function(User){
    var userRouter = express.Router();

    userRouter.route('/Register')
        .post(function(req, res){
            var entity = new User(req.body);
            entity.save();

            res.status(201).send(entity);
        });

    return userRouter;
};

module.exports = routes;