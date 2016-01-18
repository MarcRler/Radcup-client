angular.module('radcup').controller('loginController', function ($scope, userService, $location, $state){
/* loginController dient als Bindeglied zwischen der login view und
der userService.login function. */
$scope.login = {};
    $scope.submitLoginForm = function() {
        /*checkApi dient zum prüfen ob Backend läuft*/
        userService.checkApi($scope.login).then(function(data){
        console.log(data);
        },function (error) {
        console.log(error);
        if (error.status == 0)
        $scope.login.error='Error: backend is not running!';
        });

        userService.login($scope.login).then(function (data) {
          $scope.login.email=data;
          var name = window.localStorage['email'] ;
          console.log('call the httpheader set method');
          if (userService.setUserHeader()) // wenn http header gesetzt
          $state.go('main.games'); // leite auf main.games weiter
                }, function (error) {
                  if(error.status===401 || error.data==='Unauthorized'){
                    console.log("Information from Backend: Unauthorized - Please use valid credentials!")
                    $scope.login.error='Please use valid credentials!';
                  } else {
                    console.log('unknown error occured')
                  }
        });
    };


});
