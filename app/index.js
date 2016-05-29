var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('./config/database');
var io = require('socket.io').listen(5000);

io.sockets.on('connection', function (socket) {
    console.log('socket works');
    socket.on('connect',function (){console.log('connect on')})
    socket.emit('newOrder', { lol: 'its work' });
});
mongoose.connect(database.url);
var db = mongoose.connection;
//var app = require('./')
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("successful database connection");
});
var ord =require('./datamodel');




/* GET home page. */
router.get('/taxi', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/taxi.admin', function(req, res, next) {
    res.render('admin', { title: 'Express' });
});

router.post('/orderform',function(req,res){
    console.log(req.body);
    var newOrders = new ord.orderline ({
        AdressFrom: req.body.adrfrom,
        AdressTo:req.body.adrto,
        Phone: req.body.phone,
        Name: req.body.username,
        Vechile:req.body.vehicle,
        Discription:req.body.adrdescription,
        OrderStatus:req.body.orderstatusadr,
        DateTime: new Date().toLocaleString()
    });
    var data = req.body;
    newOrders.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('save good rec');
            console.log(newOrders);
            io.emit('send to all');
            io.emit('newOrder', newOrders);
        }
    });


    res.end("success");
});

router.post('/contactus',function(req,res){
    console.log(req.body);
    var newContactUS = new ord.ContactUs ({
        Name: req.body.nameus,
        Email:req.body.email,
        Discription:req.body.message,
        DateTime: new Date().toLocaleString()
    });
    var contact = req.body;
    newContactUS.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('save good rec');
            console.log(newContactUS);

        }
    });


    res.end("success");
});


module.exports = router;
