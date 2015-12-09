angular.module('radcup').service('locationService', function($cordovaGeolocation) {

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };

  var myPosition = null;
  var promise = $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function(position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude

       myPosition = {
        lat: latitude,
        long: longitude
      };

      console.log(latitude, longitude);

    }, function(err) {

       myPosition = {
        lat: 0,
        long: 0
      };

      console.log(err);

    });


  return {
    promise: promise,
    getPosition: function() {
      return myPosition;
    }
  };

});
