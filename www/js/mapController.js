angular.module('radcup').controller('mapController', function($scope, locationService) {

  console.log(locationService.getPosition());
  var position = locationService.getPosition();

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: position.lat,
      lng: position.long
    },
    scrollwheel: false,
    zoom: 14
  });

  var myLatLng = {
    lat: position.lat,
    lng: position.long
  };
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Your Position!'
  });


});
