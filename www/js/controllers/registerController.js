angular.module('radcup').controller('registerController', function($scope, userService, $location) {
$scope.user={};
$scope.register= function() {
  userService.register($scope.user).then(function (data) {
  console.log("register success in controllaaa");
}, function (error) {

  console.log("register ERROR in controllaaa");


});
};


});
