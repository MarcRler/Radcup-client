angular.module('radcup').controller('statisticsController', function($scope, gamesService) {
//http://krispo.github.io/angular-nvd3/#/quickstart
$scope.options={};
$scope.data={};
  $scope.options = {
              chart: {
                  type: 'pieChart',
                  height: 400,
                  x: function(d){return d.key;},
                  y: function(d){return d.y;},
                  showLabels: true,
                  duration: 500,
                  labelThreshold: 0.01,
                  labelSunbeamLayout: false,
                  donut: true,
                  legend: {
                      margin: {
                          top: 5,
                          right: 35,
                          bottom: 5,
                          left: 0
                      }
                  }
              }
          };

          var statistic = gamesService.statistics().get();

          statistic.$promise.then(function(data) {
         $scope.hide = true;

          $scope.data = [
              {
                  key: "Won: "+0,
                  y: 0,
                  color:"#297239"
              },
              {
                  key: "Lost:"+0,
                  y: 0,
                  color:"#EF473A"
              },
              {
                  key: "Draw: "+0,
                  y: 0,
                  color:"#FF8F0E"
              }
          ];

          });


    var statistic = gamesService.statistics().get();

    statistic.$promise.then(function(data) {
   $scope.hide = true;

    $scope.data = [
        {
            key: "Won: "+data.won,
            y: data.won,
            color:"#297239"
        },
        {
            key: "Lost:"+data.lost,
            y: data.lost,
            color:"#EF473A"
        },
        {
            key: "Draw: "+data.draw,
            y: data.draw,
            color:"#FF6F0E"
        }
    ];

    });

});
