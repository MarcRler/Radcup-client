angular.module('radcup').controller('gamesController', function($scope, gamesService) {
  /* gamesController dient als Bindeglied zwischen der main-games view und
  der gamesService.joinableGames function. */
  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.joinableGames().query();
  });

});
