angular.module('radcup').controller('gameController', function ($scope, $stateParams, $state, gamesService, userService,$ionicPopup) {
  /* gameController dient als Bindeglied zwischen der game view und
  der gamesService.allGames function.
  */
  $scope.$on('$ionicView.enter', function () {
    $scope.loadGame();
    $scope.user = window.localStorage.userid;
  });

  /* updateGame function, wird genutzt um aktuelles Spiel Objekt zu aktualisieren
  */
  $scope.updateGame = function () {
    $scope.game.$update(function () {
      $state.go('main.games');
    });
  };

  /* loadGame function, ruft aus GameService alle Spiele mit einer entsprechenden
  Spiel ID auf und setzt diese in den scope um es in der View anzuzeigen
  */
  $scope.loadGame = function () {
    var game = gamesService.allGames().get({ id: $stateParams.id });

    game.$promise.then(function(data) {

      $scope.game = game;

      setAddress();

      $scope.time = setTimeForGame($scope.game.time);

    });
  };

  /*join function, wird genutzt um freie Plätze anzuzeigen bzw. um einem freien
  Platz beitreten zu können.
  */
  $scope.join = function (position) {

    $scope.game.players.two = "freeSlot";
    $scope.game.players.three = "freeSlot";
    $scope.game.players.four = "freeSlot";

    switch (position) {
      case 2:
        if ($scope.game.players.two === 'freeSlot') {
          if($scope.game.players.three != window.localStorage.username && $scope.game.players.four!=window.localStorage.username){
            $scope.game.players.two = window.localStorage.username;
          }
        }
        break;
      case 3:
        if ($scope.game.players.three === 'freeSlot') {
          if($scope.game.players.two != window.localStorage.username && $scope.game.players.four!=window.localStorage.username){
            $scope.game.players.three = window.localStorage.username;
          }
        }
        break;
      case 4:
        if ($scope.game.players.four === 'freeSlot') {
          if($scope.game.players.two != window.localStorage.username && $scope.game.players.two!=window.localStorage.username){
            $scope.game.players.four = window.localStorage.username;
          }
        }
        break;
    };
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

  $scope.showConfirm = function() {
  var confirmPopup = $ionicPopup.confirm({
    title: 'Dem Team wirklich beitreten?',
    template: 'Zur Zeit ist das nachträgliche wechseln nichtmehr möglich'
  });

  confirmPopup.then(function(res) {
    if(res) {
      console.log('You are sure');
      $scope.updateGame()
    } else {
      console.log('You are not sure');
    }
  });
};
});
