/**
 * Created by BAKUN on 03.05.2016.
 */
var mongoose = require('mongoose');
/* DB connection */
mongoose.connect('mongodb://taxiserver:servertaxi@ds019491.mlab.com:19491/db_service');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("succesful database connection");
});
var ordersSchema = mongoose.Schema({
    AdressFrom: String,
    AdressName: String,
    Name: String,
    Phone: Number,
    Vechile:String,
    Discription:String,
    OrderStatus:String
});
var Orders = mongoose.model('orders',ordersSchema)      ///new collection orders model

var newOrders = new Orders({
    AdressFrom:'test1',
    AdressName:'test2',
    Phone:'3255621'
});
newOrders.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('save good');
    }
});
console.log(newOrders);
