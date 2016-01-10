angular.module('radcup').controller('myGamesController', function($scope, $http, gamesService) {

  $scope.username = window.localStorage.username;

  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.joinedGames().query();
  });
});
