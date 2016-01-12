angular.module('radcup').service('locationService', function($cordovaGeolocation, $q) {
/*von Googlemap Api benötigte Paramter*/
  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };
/*default position zum initialisieren*/
  var position = {
    lat: 0,
    lng: 0
  };
/*Liest aus cordova die device position via GPS aus*/
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
