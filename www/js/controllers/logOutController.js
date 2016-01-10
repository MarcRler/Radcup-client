angular.module('radcup').controller('logOutController', function ($scope, userService, $location, $state, $window){
/* logOutController dient als Bindeglied zwischen der settings view und
der userService.logout function. */
$scope.logout = {};
    $scope.logoutThisUser = function() {
      if(userService.logout()){
          // wenn http header gelöscht, leite weiter auf login
          $window.location = '#/login';
          $window.location.reload();
          
      } else{
        alert('unknown error occured: ');
      }
};
});