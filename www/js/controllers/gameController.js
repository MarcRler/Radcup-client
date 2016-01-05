angular.module('radcup').controller('gameController', function($scope, $stateParams, $state, gamesService, userService) {
  $scope.$on('$ionicView.enter', function() {
    $scope.game = gamesService.allGames().get({ id:$stateParams.id });
  });

  $scope.updateGame = function() {
    $scope.game.$update(function() {
      $state.go('main.games');
    });
  };
});
