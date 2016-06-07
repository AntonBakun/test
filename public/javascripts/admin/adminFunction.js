var Admin = angular.module('adminPanel',['ngAnimate','toastr']);

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



Admin.controller('orderBoard',function($scope,socket,toastr){

    $scope.id  = 0;
    $scope.orders = [{}];
    $scope.countOrders = 0;
    $scope.new = {};

    socket.on('newOrder', function(data) {
        toastr.warning('came a new order','New online order',{autoDismiss:false , positionClass:'toast-top-full-width'});
        console.log('socket.io data', data);
        $scope.id = $scope.id + 1;
        $scope.countOrders = $scope.countOrders + 1;
        $scope.orders.unshift({online:data});
    });

    $scope.update = function(adminOrder){
        $scope.new = angular.copy(adminOrder);
        var data = $scope.new;
        socket.emit('adminOrder',data,function (){
            console.log(data);
        });

    };

    $scope.sendToDriver = function (driver){

    };
});






