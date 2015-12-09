angular.module('radcup').controller('landingController', function($cordovaGeolocation) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.console.log(lat,long);
      }, function(err) {
         console.console.log(err);
      });
  }
);
