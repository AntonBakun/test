var mongoose = require('mongoose');

 var ordersSchema = mongoose.Schema({
    AdressFrom: String,
   AdressTo: String,
   Name: String,
    Phone: Number,
    Vechile:String,
   Discription:String,
  OrderStatus:String,
     Username: String,
   DateTime:String
});
 var ContactUsSchema = mongoose.Schema({
   Name: String,
   Email: String,
   Discription: String,
     DateTime:String
});

var RoleSchema= mongoose.Schema({
    Username:String,
    Role:String
});
var Rol = mongoose.model('role',RoleSchema);
var Orders = mongoose.model('orders',ordersSchema);
var ContactUs = mongoose.model('contactUs',ContactUsSchema);
module.exports.orderline = Orders;///new collection orders model;
module.exports.ContactUs = ContactUs;///new collection dispatcherSchema model;
module.exports.role = Rol;
