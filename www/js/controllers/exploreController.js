angular.module('radcup').controller('exploreController', function($scope, $stateParams, gamesService) {
  /* exploreController dient als Bindeglied zwischen der explore view und
  der gamesService.allGames function. Ruft alle Spiele ab um diese darzustellen
  */
  $scope.$on('$ionicView.enter', function() {
    var gamesList = gamesService.allGames().query();

    gamesList.$promise.then(function(data) {

      $scope.hide = true;
      $scope.games = gamesList;
    });
  });

});
