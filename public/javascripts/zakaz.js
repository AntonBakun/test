/**
 * Created by BAKUN on 29.02.2016.
 */

var app = angular.module('myApp',  []);
app.controller('myOrder', function ($scope,$http) {

	$scope.newOrder = {orderstatusadr:'0'
		};
	$scope.contactUs = {};

	$scope.update = function(user) {
		$scope.newOrder = angular.copy(user);
		//console.log($scope.newOrder);
		var data = $scope.newOrder;
		$http.post('/orderform', data)
				.success(function (data, status, headers, config) {
					$scope.PostDataResponse = data;
					console.log($scope.PostDataResponse);
					$scope.reset();
				})
				.error(function (data, status, headers, config) {
					$scope.ResponseDetails = {
						Data: data,
						status: status,
						header: headers,
						config: config
					};
					console.log($scope.ResponseDetails);
				});





	};

	$scope.send =  function(user){
		$scope.contactUs = angular.copy(user);
		var contact = $scope.contactUs;
		$http.post('/contactus', contact)
				.success(function (contact, status, headers, config) {
					$scope.PostDataResponse = contact;
					console.log($scope.PostDataResponse);
					$scope.reset();
				})
				.error(function (data, status, headers, config) {
					$scope.ResponseDetails = {
						Data: data,
						status: status,
						header: headers,
						config: config
					};
					console.log($scope.ResponseDetails);
				});
	};


	$scope.reset = function() {
		$scope.user = angular.copy($scope.contactUs);

	};


	$scope.reset();



});
















