var express = require('express');

var routes = function(UserDetail){
    var userRouter = express.Router();

    userRouter.route('/User')
        .get(function(req, res)
        {
            UserDetail.find(req.query, function(err, entities){
                if (err)
                {
                    res.status(500).send(err)
                }
                else{
                    res.json(entities);
                }
            });
        });

    return userRouter;
};

module.exports = routes;