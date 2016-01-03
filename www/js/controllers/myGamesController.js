angular.module('radcup').controller('myGamesController', function($scope, $http, gamesService) {

  $scope.$on('$ionicView.enter', function() {
    gamesService.getGames('http://localhost:3000/api/myGames').then(function(resolve){
      $scope.games = resolve.data;    
    },
    function(reject){
      $scope.games = reject;
    });
  });
});
