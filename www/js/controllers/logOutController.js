angular.module('radcup').controller('logOutController', function ($scope, userService, $location, $state, $window){
/* logOutController dient als Bindeglied zwischen der settings view und
der userService.logout function. */

    $scope.logoutThisUser = function() {
      if(userService.logout()){
          $state.go('landing');
      } else{
        console.log('unknown error occured: ');
      }
};
});
