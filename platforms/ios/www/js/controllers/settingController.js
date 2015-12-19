angular.module('radcup').controller('settingController', function($scope, userService, $location) {
$scope.oldUsername=window.localStorage['username'];
$scope.oldEmail=window.localStorage['email'];
$scope.oldPassword=window.localStorage['password'];
  $scope.settings = {};
  $scope.updateSettingForm= function() {
    userService.update($scope.settings)
    .then(
      function (data) {
          alert("update successfull!");
          if(userService.logout()) {
            $location.path('/login');
          }
      },
      function (error) {
          $scope.settings.error=error.data;
      });
    };
  });
