angular.module('radcup').controller('exploreController', function($scope, $http, gamesService) {

  $scope.$on('$ionicView.enter', function() {
    gamesService.getGames('http://localhost:3000/api/games').then(function(resolve){
      $scope.games = resolve.data;
    },
    function(reject){
      $scope.games = reject;
    });
  });
});
