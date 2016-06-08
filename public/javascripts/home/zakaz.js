/**
 * Created by BAKUN on 29.02.2016.
 */

var app = angular.module('myApp',  ['ngAnimate','toastr','ngCookies']);
app.controller('myOrder', function ($scope,$http,toastr,$cookies) {

	$scope.newOrder = {orderstatusadr:'wait'
		};
	$scope.contactUs = {};
	$scope.user ={};

	$scope.update = function(user) {
		toastr.success('Your order in process.Expect 15 minutes, to you SMS with brand and number of the car will come.Thank you that used our service.','Hello',{progressBar:true , positionClass:'toast-top-full-width'});
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
		toastr.success('Your message send,we are contact you','Hello',{progressBar:true , positionClass:'toast-top-full-width'});
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
















