angular.module('radcup').controller('gameController', function ($scope, $stateParams, $state, gamesService, userService) {
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
        if ($scope.game.players.two === 'freeSlot') {
          if($scope.game.players.three != window.localStorage.username && $scope.game.players.four!=window.localStorage.username){
            $scope.game.players.two = window.localStorage.username;
          }
        }
        break;
      case 3:
        if ($scope.game.players.three === 'freeSlot') {
          if($scope.game.players.two != window.localStorage.username && $scope.game.players.four!=window.localStorage.username){
            $scope.game.players.three = window.localStorage.username;
          }
        }
        break;
      case 4:
        if ($scope.game.players.four === 'freeSlot') {
          if($scope.game.players.two != window.localStorage.username && $scope.game.players.two!=window.localStorage.username){
            $scope.game.players.four = window.localStorage.username;
          }
        }
        break;
    };
  };
});
