var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var database = require('./config/database');
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback (){
    console.log("successful database connection");
});
var newSave = require('./databasefunc');
function debuggg ()
{
    for(  var i = 1 ; i<3 ; i++ )
    {
         return console.log(newSave.newRec.i);
    }
}
 debuggg();

//var SaveNewSave  = function (){
  //  for (var i = 1; i < 3; i++) {
  //      newSave.newRec.i.save(function (err) {
  //          if (err) {
  //              console.log(err);
  //          } else {
  //              console.log('save good rec');
  //              console.log( newSave.newRec.i);
  //          }
  //      });
  //  }
//};
//SaveNewSave();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
