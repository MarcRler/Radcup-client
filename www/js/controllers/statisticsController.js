angular.module('radcup').controller('statisticsController', function($scope,gamesService) {


  var statistic = gamesService.statistics().get();

  statistic.$promise.then(function(data) {

    $scope.won = data.won;
    $scope.lost = data.lost;
    $scope.draw = data.draw;

  });



  });
