angular.module('radcup').controller('statisticsController', function($scope,gamesService) {
//http://krispo.github.io/angular-nvd3/#/quickstart
  $scope.options = {
              chart: {
                  type: 'pieChart',
                  height: 300,
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

          $scope.data = [
              {
                  key: "Won",
                  y: 5
              },
              {
                  key: "Lost",
                  y: 2
              },
              {
                  key: "Draw",
                  y: 9
              }
          ];

  var statistic = gamesService.statistics().get();

  statistic.$promise.then(function(data) {

    $scope.won = data.won;
    $scope.lost = data.lost;
    $scope.draw = data.draw;
    $scope.data = [
        {
            key: "Won: "+data.won,
            y: data.won
        },
        {
            key: "Lost:"+data.lost,
            y: data.lost
        },
        {
            key: "Draw: "+data.draw,
            y: data.draw
        }
    ];

  });



  });
