angular.module('radcup').controller('gameController', function ($scope, $stateParams, $state, gamesService, userService) {
  /* gameController dient als Bindeglied zwischen der game view und
  der gamesService.allGames function.
  */
  $scope.$on('$ionicView.enter', function () {
    $scope.loadGame();
    $scope.user = window.localStorage.userid;
  });

  /* updateGame function, wird genutzt um aktuelles Spiel Objekt zu aktualisieren
  */
  $scope.updateGame = function () {
    $scope.game.$update(function () {
      $state.go('main.games');
    });
  };

  /* loadGame function, ruft aus GameService alle Spiele mit einer entsprechenden
  Spiel ID auf und setzt diese in den scope um es in der View anzuzeigen
  */
  $scope.loadGame = function () {
    $scope.game = gamesService.allGames().get({ id: $stateParams.id });
  };

  $scope.loadGame();

  /*join function, wird genutzt um freie Plätze anzuzeigen bzw. um einem freien
  Platz beitreten zu können.
  */
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
