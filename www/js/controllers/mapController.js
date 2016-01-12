angular.module('radcup').controller('mapController', function($scope, locationService, $location, gamesService,$state) {
  /* mapController dient als Bindeglied zwischen der map view und
  der location.getPosition function. */
  var button = document.getElementById('startMapButton');
  button.style.visibility = 'hidden';

  var chosenPosition = null;
  // position abrufen
  locationService.getPosition().then(function(position) {
    var markers = [];
   //neue map anlegen, mit entsprechenden Paramtern wie zoom etc.
    if (!position) return;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      scrollwheel: false,
      zoom: 14
    });
    //neuen Marker mit eigener Position auf Map anlegen
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'Your Position!',
      icon: '/img/location-icons/my-location.svg'
    });
    //neuen click Listener anlegen wird für addMarker benötigt
    map.addListener('click', function(event) {
      clearMarkers();
      button.style.visibility = 'visible';
      chosenPosition = event.latLng;
      console.log(chosenPosition);
      addMarker(chosenPosition);
    });
   // Marker auf Map nach Click setzen (blaue Fahne)
    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: '/img/location-icons/set-gamelocation.svg'

      });
      markers.push(marker);
    }
   //rendert Map
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    //marker entfernen
    function clearMarkers() {
      setMapOnAll(null);
    }
    //marker löschen
    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }

  });


 //neues Spiel anlegen, anschließend auf main.games umleiten.
  $scope.createGame = function() {

    gamesService.createNewGame(chosenPosition).then(function() {

      alert("success");
      $state.go('main.games');

    }, function(error) {

      if (error == null) {
        alert("fail")
      }
    });
  }

});
