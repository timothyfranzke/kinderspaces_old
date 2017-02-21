var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();

    bookRouter.route('/Books')
        .get(function(req, res)
        {
            Book.find(req.query, function(err, books){
                if (err)
                {
                    res.status(500).send(err);
                }
                else{
                    res.json(books);
                }
            });
        })
        .post(function(req, res){
            var book = new Book(req.body);
            book.save();

            res.status(201).send(book);
        });

    bookRouter.route('/Books/:bookId')
        .get(function(req, res){
            var query = {};
            query.genre = req.query.genre;
            Book.findById(req.params.bookId, function(err, book){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        })
        .post(function(req, res){
            console.log("posted");
        });

    return bookRouter;
};

module.exports = routes;