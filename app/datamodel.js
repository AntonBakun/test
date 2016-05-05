var mongoose = require('mongoose');

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
 var dispatcherSchema = mongoose.Schema({
   AdressFrom: String,
   AdressTo: String,
   Name: String,
   Phone: Number,
   Vechile: String,
   Discription: String,
   OrderStatus: String,
   DateTime: String
});
var Orders = mongoose.model('orders',ordersSchema);
var Dispatchers = mongoose.model('dispatchers',dispatcherSchema);
module.exports.orderline = Orders;///new collection orders model;
module.exports.dispatcher = Dispatchers;///new collection dispatcherSchema model;
