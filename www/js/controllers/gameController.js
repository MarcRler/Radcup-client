angular.module('radcup').controller('gameController', function ($scope, $stateParams, $state, gamesService) {
  $scope.$on('$ionicView.enter', function () {
    $scope.loadGame();
    $scope.user = window.localStorage.userid;
  });

  $scope.updateGame = function () {
    $scope.game.$update(function () {
      $state.go('main.games');
    });
  };

  $scope.loadGame = function () {
    $scope.game = gamesService.allGames().get({ id: $stateParams.id });
  };

  $scope.loadGame();

  $scope.join = function (position) {
    switch (position) {
      case 2:
        $scope.game.players.two = window.localStorage.userid;
        $scope.game.players.three = 'freeSlot';
        $scope.game.players.four = 'freeSlot';
        break;
      case 3:
        $scope.game.players.three = window.localStorage.userid;
        $scope.game.players.two = 'freeSlot';
        $scope.game.players.four = 'freeSlot';
        break;
      case 4:
        $scope.game.players.four = window.localStorage.userid;
        $scope.game.players.two = 'freeSlot';
        $scope.game.players.three = 'freeSlot';
        break;
    };
  };
});
