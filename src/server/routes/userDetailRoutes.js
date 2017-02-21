var express = require('express');

var routes = function(UserDetail){
    var userRouter = express.Router();
    userRouter.route('/User/:userId')
        .get(function(req, res)
        {
            UserDetail.findById(req.params.userId, function(err, user){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(user);
            });
        })
        .post(function(req,res){
            var userDetail = new UserDetail(req.body);
            userDetail.userId = req.params.userId;
            userDetail.save();

            res.status(201).send(userDetail);
        })
        .put(function(req, res){
            console.log("posted");
        })
        .delete(function(req,res){

        });

    return userRouter;
};

module.exports = routes;