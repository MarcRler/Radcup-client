angular.module('radcup').controller('gameOverviewController', function($scope, gamesService, $stateParams, $state) {


  $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on('$ionicView.enter', function() {
    $scope.game = {};
    $scope.game.results = {};
    $scope.user = {};
    $scope.user.username = window.localStorage.username;
    $scope.loadGame();
  });


  $scope.loadGame = function() {
    var game = gamesService.allGames().get({
      id: $stateParams.id
    });

    game.$promise.then(function(data) {

      $scope.game = game;

      setAddress();
      setTimeForGame();

    });
  };

  $scope.updateGame = function(param) {

    if (param === 1) {
      $scope.game.state = "started";
      $scope.game.results.startTime = new Date();
    } else {
      $scope.game.state = "finished";
      $scope.game.results.endTime = new Date();
    }

    console.log($scope.game);
    console.log($scope.game.results);

    $scope.game.$update(function() {
      if (param === 2) {
        $state.go('main.myGames');
      }
    });
  };

  setAddress = function() {

    var geocoder = new google.maps.Geocoder();
    var location = new google.maps.LatLng($scope.game.lat, $scope.game.lng);
    geocoder.geocode({
        'latLng': location
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var add = results[0].formatted_address;
          $scope.address = add;
        }
    });
  }

  setTimeForGame = function(){

    var date = new Date($scope.game.time);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var hoursSize = hours.toString().length;
    var minutes = date.getMinutes();
    var minutesSize = minutes.toString().length;

    if(hoursSize==1){
      hours = 0+''+hours;
    }

    if(minutesSize==1){
      minutes = 0+''+minutes;
    }

    var playDate = day+'.'+month+'.'+year+' '+hours+':'+minutes;

    $scope.time = playDate;


  }
});
