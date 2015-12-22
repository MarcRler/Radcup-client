angular.module('radcup').controller('myGamesController', function($scope, $http, userService) {



  $scope.$on('$ionicView.enter', function() {
    $http.get('http://localhost:3000/api/myGames').
    success(function(data) {
      $scope.games = data;

    }).error(function(data, status) {
      console.log(data, status);
    });
  });
});
