angular.module('radcup').controller('gamesController', function($scope, $http) {

  $scope.$on('$ionicView.enter', function() {
    $http.get('http://localhost:3000/api/joinableGames').
    success(function(data) {
      $scope.games = data;

    }).error(function(data, status) {
      console.log(data, status);
    });
  });
});
