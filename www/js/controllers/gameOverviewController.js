angular.module('radcup').controller('gameOverviewController', function($scope, gamesService, $stateParams, $state) {


  $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on('$ionicView.enter', function() {

    var date = new Date();
    $scope.dateDate = {};
    $scope.dateDate.timeNow = date.getTime();

    $scope.game = {};
    $scope.results = {};
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
      console.log($scope.game);
      console.log($scope.game.results);

      var date = new Date(game.time);
      $scope.timeDate = {};
      $scope.timeDate.meetingPoint = date.getTime();

      setAddress();

      $scope.time = setTimeForGame($scope.game.time);
      $scope.results.startTime = setTimeForGame($scope.game.results.startTime);
      $scope.results.endTime = setTimeForGame($scope.game.results.endTime);

    });
  };

  $scope.updateGame = function(param) {

    if (param === 1) {
      $scope.game.state = "started";
      $scope.game.results.startTime = new Date();
      $scope.results.startTime = setTimeForGame($scope.game.results.startTime);
    } else {
      $scope.game.state = "finished";
      $scope.game.results.endTime = new Date();
      $scope.results.startTime = setTimeForGame($scope.game.results.endTime);
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

  setTimeForGame = function(time) {

    var date = new Date(time);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var hoursSize = hours.toString().length;
    var minutes = date.getMinutes();
    var minutesSize = minutes.toString().length;

    if (hoursSize == 1) {
      hours = 0 + '' + hours;
    }

    if (minutesSize == 1) {
      minutes = 0 + '' + minutes;
    }

    var playDate = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;

    return playDate;
  }
});
