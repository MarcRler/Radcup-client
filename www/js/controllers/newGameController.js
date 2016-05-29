angular.module('radcup').controller('newGameController', function($scope, $http, $httpParamSerializerJQLike, gamesService) {
  /* newGameController dient als Bindeglied zwischen der new_game view und
  der gameService.initializeGame function. */
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $scope.date = new Date();
  });

  $scope.game = {};
//initializeGame function legt neues Spiel mit leeren lat/Lat und Beschreibung an
  $scope.initializeGame = function() {
    var newGame = {
      desc: $scope.game.desc,
      time: $scope.game.time,
      lat: null,
      lng: null
    }
    console.log(newGame);
    gamesService.setGame(newGame);
  }

  $scope.initializeGameNow = function() {
    var newGame2 = {
      desc: $scope.game.desc+' play now game',
      time: new Date(),
      lat: null,
      lng: null
    }
    console.log(newGame2);
    gamesService.setGame(newGame2);


  }
});
