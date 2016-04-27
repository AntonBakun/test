var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



/* DB connection */
mongoose.connect('mongodb://taxiserver:servertaxi@ds019491.mlab.com:19491/db_service');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
	console.log("succesful database connection");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
