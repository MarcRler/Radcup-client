angular.module('radcup').controller('gamesController', function($scope, $http, gamesService) {

  $scope.$on('$ionicView.enter', function() {
    gamesService.getGames('http://localhost:3000/api/joinableGames').then(function(resolve){
      $scope.games = resolve.data;
    },
    function(reject){
      $scope.games = reject;
    });
  });
});
