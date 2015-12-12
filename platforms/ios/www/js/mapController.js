angular.module('radcup').controller('mapController', function($scope, locationService) {

  locationService.getPosition().then(function(position) {
    if (!position) return;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: position,
      scrollwheel: false,
      zoom: 14
    });

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'Your Position!'
    });

    
  });

});
