angular.module('radcup').controller('myGamesController', function($scope, $http, gamesService) {

  /* myGameController dient als Bindeglied zwischen der myGames view und
  der gameService.joinedGames function. */

  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.joinedGames().query();
  });
});
