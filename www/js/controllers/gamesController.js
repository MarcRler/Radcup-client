angular.module('radcup').controller('gamesController', function($scope, gamesService) {

  $scope.$on('$ionicView.enter', function() {
    $scope.games = gamesService.joinableGames().query();
  });

});
