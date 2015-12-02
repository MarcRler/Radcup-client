angular.module('radcup', [])

.controller('gamesController', function($scope, $http) {

    $http.get('http://localhost:3000/api/games').
    success(function(data) {
      $scope.games = data;
      
    });
  }
);
