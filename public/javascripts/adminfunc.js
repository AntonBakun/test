// window.onload = function(){
       // socket = io.connect('http://localhost:5000', {'transports': ['xhr-polling']});
        // socket.on('NewOrder', function (data) {
            // console.log(data);
        // });
// };

var socket = io.connect('http://localhost:5000');

socket.on('newOrder', function(data) {
    console.log('socket.io data', data);
});



    //var socket =  function() {
      //  io.connect('http://localhost:5000', {reconnect: true});
      //  io.on('NewOrder', function (data) {
        //    console.log(data.phone);
    //};
    //};
// Add a connect listener
    // socket.emit('connect', function (socket) {
    // console.log('Connected!');
    //});
    //setInterval()
//socket();

<p>From:{{order.online.AdressFrom}}.</p>
<p>To:{{order.online.AdressTo}}.</p>
<p>Vechile:{{order.online.Vechile}}.</p>