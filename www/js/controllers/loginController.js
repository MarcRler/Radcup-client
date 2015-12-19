angular.module('radcup').controller('loginController', function ($scope, userService, $location,$state){
$scope.login = {};
    $scope.submitLoginForm = function() {
        userService.login($scope.login).then(function (data) {
          console.log('controllerrr: '+data);
          $scope.login.email=data;
          var name = window.localStorage['email'] ;
          console.log('test: '+name);
          console.log('call the httpheader settaaaa boi');
          if (userService.setUserHeader())
          $state.go('main.games');
                }, function (error) {
                  if(error.status===401 || error.data==='Unauthorized'){
                    console.log("Information from Backend:Unauthorized - Please use valid credentials!")
                    $scope.login.email='Please use valid credentials!';
                    $scope.login.password='Please use valid credentials!';
                  } else {
                    alert('unknown error occured')
                  }
        });
    };


});
