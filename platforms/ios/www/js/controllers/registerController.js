angular.module('radcup').controller('registerController', function($scope, userService, $state,$ionicHistory) {
  /* registerController dient als Bindeglied zwischen der register view und
  der userService.register function. */
  $scope.user = {};
  //register function welche aus der view gerufen wird wenn der submit button gedrückt wurde
  $scope.register = function() {
    userService.register($scope.user)
      .then(
        function(data) {
          console.log("register successfull!");
          //ionicHistory etc. dient dazu damit kein zurück button mehr erscheint.
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('login');
        },
        function(error) {
          if(error.data.error==='Duplicate validation error'){
            $scope.user.error ='This credentials already in use!'
          } else {
            $scope.user.error=error.data.error;
          }
        });
  };
});
