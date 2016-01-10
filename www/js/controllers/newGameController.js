angular.module('radcup').controller('newGameController', function($scope, $http, $httpParamSerializerJQLike, gamesService) {
  /* newGameController dient als Bindeglied zwischen der new_game view und
  der gameService.initializeGame function. */
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.game = {};

  $scope.initializeGame = function() {
    var newGame = {
      desc: $scope.game.desc,
      lat: null,
      lng: null
    }
    console.log(newGame);
    gamesService.setGame(newGame);
  }
});
