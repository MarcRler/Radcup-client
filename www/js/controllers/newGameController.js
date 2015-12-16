angular.module('radcup').controller('newGameController', function($scope, $http, $httpParamSerializerJQLike, gamesService) {

  $scope.game = {};




  $scope.initializeGame = function() {

    var newGame = {
      address: $scope.game.adress,
      lat: null,
      lng: null
    }
    console.log(newGame);
    gamesService.setGame(newGame);
  }
});
