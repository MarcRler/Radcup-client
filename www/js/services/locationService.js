angular.module('radcup').service('locationService', function($cordovaGeolocation, $q) {

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };

  var position = {
    lat: 0,
    lng: 0
  };

  this.getPosition = function() {
    return $q(function(resolve, reject) {
      if(position.lat != 0 && position.lng != 0){
        resolve(position);
        return;
      }
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(p) {
        position.lat = p.coords.latitude;
        position.lng = p.coords.longitude;
        resolve(position);
      }, function(error){
        reject();
      });
    });
  }
});
