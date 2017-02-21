var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
    var BearerStrategy = require('passport-http-bearer').Strategy;

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./models/bookModel');
var Entity = require('./models/entityModel');
var EntityLocation = require('./models/entityLocationModel');
var EntityLocationRoom = require('./models/entityLocationRoomModel');
var User = require('./models/userModel');
var UserDetail = require('./models/userDetailModel');

var port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);
entityRouter = require('./routes/entityRoutes')(Entity);
entityLocationRouter = require('./routes/entityLocationRoutes')(EntityLocation, EntityLocationRoom, User);
entityLocationRoomRouter = require('./routes/entityLocationRoomRoutes')(EntityLocationRoom, UserDetail);
authRouter = require('./routes/authRoutes')(User);
userRouter = require('./routes/userRoutes')(User);
userDetailRouter = require('./routes/userDetailRoutes')(UserDetail);

app.use('/api', bookRouter);
app.use('/api', entityRouter);
app.use('/api', entityLocationRouter);
app.use('/api', entityLocationRoomRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', userDetailRouter);

app.get('/', function(req, res){
    res.send('welcome to my API');
});
var route = express.Router();
route.get('/login', function(req, res){

});


app.listen(port, function(){
    console.log('Gulp is running');
});
