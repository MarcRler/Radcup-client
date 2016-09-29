angular.module('radcup').controller('settingController', function($scope, userService, $window) {
/* settingsController dient als Bindeglied zwischen der main.settings view und
der userService.update function. */
$scope.oldUsername=window.localStorage['username'];
$scope.oldEmail=window.localStorage['email'];
$scope.oldPassword=window.localStorage['password'];
$scope.settings = {};

  $scope.updateSettingForm= function() {


    var newUpdate = {
      email: $scope.settings.email,
      password: $scope.settings.password,

    }
    console.log("rufe service"+newUpdate);
    userService.update(newUpdate)
    .then(
      function (data) {
          if(userService.logout()) {
            $window.location = '#/login';
            $window.location.reload();
          }
      },
      function (error) {
          $scope.settings.error=error.data;
      });
    };
  });
