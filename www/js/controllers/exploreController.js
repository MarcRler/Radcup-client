angular.module('radcup').controller('exploreController', function($scope, $stateParams, gamesService) {
  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.allGames().query();
  });
});
