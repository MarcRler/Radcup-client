angular.module('radcup').controller('exploreController', function($scope, $stateParams, gamesService) {
  /* exploreController dient als Bindeglied zwischen der explore view und
  der gamesService.allGames function.
  */
  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.allGames().query();
  });
});
