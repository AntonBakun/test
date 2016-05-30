var Admin = angular.module('adminPanel',[]);

Admin.factory('socket', function ($rootScope){

    var socket = io.connect('http://localhost:5000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});



Admin.controller('orderBoard',function($scope,socket){

    $scope.id  = 0;
    $scope.orders = [{}];
    $scope.countOrders = 0;

    socket.on('newOrder', function(data) {
        console.log('socket.io data', data);
        $scope.id = $scope.id + 1;
        $scope.countOrders = $scope.countOrders + 1;
        $scope.orders.unshift({online:data});
    });


});






