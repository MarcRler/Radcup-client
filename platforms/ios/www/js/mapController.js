angular.module('radcup').controller('mapController', function($scope, locationService) {

  locationService.getPosition().then(function(position) {
    var markers = [];

    if (!position) return;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      scrollwheel: false,
      zoom: 14
    });

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'Your Position!',
      icon: 'img/location.png'
    });

    map.addListener('click', function(event) {
      clearMarkers();
      addMarker(event.latLng);
    });

    function addMarker(location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });
      markers.push(marker);
    }

    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function clearMarkers() {
      setMapOnAll(null);
    }

    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }

  });

});
