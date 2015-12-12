angular.module('radcup').controller('newGameController', function($scope, $http,$httpParamSerializerJQLike) {

  $scope.game = {};

  $scope.createGame = function() {

    var input_id = $scope.game._id;
    var input_address = $scope.game.adress;

    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/games',
        data: $httpParamSerializerJQLike($scope.game),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .success(function(data) {

        alert(data);

      }).error(function(data, status) {
        console.log(data, status);
      });

  }


});
