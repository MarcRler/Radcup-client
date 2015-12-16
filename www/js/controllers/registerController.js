angular.module('radcup').controller('registerController', function($scope, userService, $location) {
$scope.user={};
//register function welche aus der view gerufen wird wenn der submit button gedrückt wurde
$scope.register= function() {
  userService.register($scope.user)
  .then(
    function (data) {
        alert("register successfull!");
        $location.path('/login');
    },
    function (error) {
        $scope.user.error=error.data.error;
    });
  };
});
