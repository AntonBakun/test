var express = require('express');
var router = express.Router();
//require('babel-core');
//import "./conectionDb.js";
// exports ('./conectionDb.js');
var mongoose = require('mongoose');
/* DB connection */
mongoose.connect('mongodb://taxiserver:servertaxi@ds019491.mlab.com:19491/db_service');
//var dateTime = new Date();
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("successful database connection");
});
var ordersSchema = mongoose.Schema({
    AdressFrom: String,
    AdressTo: String,
    Name: String,
    Phone: Number,
    Vechile:String,
    Discription:String,
    OrderStatus:String,
    DateTime:String
});
var Orders = mongoose.model('orders',ordersSchema)      ///new collection orders model

var newOrders = new Orders({
    AdressFrom:'советская 44',
    AdressTo:'суворова 96к3',
    Phone:'336739460',
    Name: 'jon doe',
    Vechile:'легковая',
    Discription:'бар матрикс',
    OrderStatus:'wait',
    DateTime: new Date().toLocaleString()
});
newOrders.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('save good');
        console.log(newOrders);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
