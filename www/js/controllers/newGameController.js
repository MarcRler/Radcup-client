angular.module('radcup').controller('newGameController', function($scope, $http, $httpParamSerializerJQLike, gamesService) {

  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.game = {};

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
});
