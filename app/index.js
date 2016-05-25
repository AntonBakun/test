var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url);
var db = mongoose.connection;
//var app = require('./')
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("successful database connection");
});
var ord =require('./datamodel');
//require('./datamodel'); ///new collection orders model

var newOrders = new ord.orderline ({
    AdressFrom:'советская 44',
    AdressTo:'суворова 96к3',
    Phone:'336739460',
    Name: 'jon doe',
    Vechile:'легковая',
    Discription:'бар матрикс',
    OrderStatus:'wait',
    DateTime: new Date().toLocaleString()
});


var newOrdersDisp = new ord.dispatcher ({
    AdressFrom:'советская 44',
    AdressTo:'суворова 96к3',
    Phone:'336739460',
    Name: 'jon doe',
    Vechile:'легковая',
    Discription:'бар матрикс',
    OrderStatus:'wait',
    DateTime: new Date().toLocaleString()
});

//newOrders.save(function (err) {
         // if (err) {console.log(err);
         //} else {
            // console.log('save good rec');
            //     console.log(newOrders );
            //}
       // });



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
    newOrders.save(function (err) {
         if (err) {console.log(err);
        } else {
         console.log('save good rec');
             console.log(newOrders );
        }
    });


    res.end("success");
});

module.exports = router;
