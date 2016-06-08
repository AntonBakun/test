var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('./config/database');
var passport = require('passport');
var Account = require('./account');
var io = require('socket.io').listen(5000);

io.sockets.on('connection', function (socket) {
    console.log('socket works');
    socket.on('adminOrder',function(data){
        var Order = new ord.orderline ({
            AdressFrom: data.adrfrom,
            AdressTo:data.adrto,
            Phone: data.phone,
            Name: data.username,
            Vechile:data.vehicle,
            Discription:data.adrdescription,
            OrderStatus:'done',
            DateTime: new Date().toLocaleString()
        });
        Order.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('save good rec');
                console.log(Order);
            }
        });
    })

});
mongoose.connect(database.url);
var db = mongoose.connection;
//var app = require('./')
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("successful database connection");
});
var ord =require('./datamodel');


/*var newUserRole = new ord.role({
    Username:'AntonBakun',
    Role:'Admin'
});
newUserRole.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Add new user to role list');
        console.log(newUserRole);

    }
}); */


/* GET home page. */ //without authentication
router.get('/', function(req, res, next) {
  res.render('index', {  user : req.user});

    console.log(req.session);
    console.log(req.user);


});
// regestration
router.get('/register', function(req, res) {
    res.render('register');
});
///new user
router.post('/register', function(req, res, next) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render("register", {info: "Sorry. That username already exists. Try again."});

            }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                //console.log(req.session);
                if (err) {
                    return next(err);
                }
                var newUserRole = new ord.role({
                    Username:req.body.username,
                    Role:'User'
                });
                newUserRole.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Add new user to role list');
                        console.log(newUserRole);

                    }
                });
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    req.session.save(function (err) {
        console.log(req.session);
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    console.log('user logout :',req.session);
    res.redirect('/');
});

router.get('/taxi-admin', function(req, res, next) {
    res.render('admin', { title: 'Express' });
});

//new order
router.post('/orderform',function(req,res){
    console.log(req.body);
    var newOrders = new ord.orderline ({
        AdressFrom: req.body.adrfrom,
        AdressTo:req.body.adrto,
        Phone: req.body.phone,
        Name: req.body.username,
        Vechile:req.body.vehicle,
        Discription:req.body.adrdescription,
        OrderStatus:'wait',
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
//new contact
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
