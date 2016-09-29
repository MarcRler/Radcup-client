angular.module('radcup').controller('statisticsController', function($scope, gamesService) {
//http://krispo.github.io/angular-nvd3/#/quickstart
var colors = ["#297239", "#EF473A", "#FF6F0E"];

  $scope.options = {
              chart: {
                  type: 'pieChart',
                  height: 500,
                  x: function(d){return d.key;},
                  y: function(d){return d.y;},
                  color: function(d,i){
                 return (d.data && d.data.color) || colors[i % colors.length]
               },
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
                  y: 5,
                  color:"#297239"

              },
              {
                  key: "Lost",
                  y: 2,
                  color:"#EF473A"

              },
              {
                  key: "Draw",
                  y: 9,
                  color:"#FF6F0E"

              }
          ];

    var statistic = gamesService.statistics().get();

    statistic.$promise.then(function(data) {
    $scope.hide = true;

    $scope.won = data.won;
    $scope.lost = data.lost;
    $scope.draw = data.draw;
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


        $scope.won = data.won;
        $scope.lost = data.lost;
        $scope.draw = data.draw;

    });

});
