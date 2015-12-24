angular.module('radcup').controller('registerController', function($scope, userService, $state,$ionicHistory) {
  $scope.user = {};
  //register function welche aus der view gerufen wird wenn der submit button gedrückt wurde
  $scope.register = function() {
    userService.register($scope.user)
      .then(
        function(data) {
          alert("register successfull!");
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
