angular.module('radcup').controller('gamesController', function($scope, gamesService) {
  /* gamesController dient als Bindeglied zwischen der main-games view und
  der gamesService.joinableGames function. */
  $scope.$on('$ionicView.enter', function() {

    var gamesList = gamesService.joinableGames().query();

    gamesList.$promise.then(function(data) {

      $scope.hide = true;
      $scope.games = gamesList;
    });
  });

  $scope.getIcons = function (username, position) {
    if (username != 'freeSlot'){
      switch (position) {
        case 'red':
          return 'red-players';
        break;
        case 'green':
          return 'green-players';
        break;
      };
    }else{
      return 'free-slot';
    };
  };


});
