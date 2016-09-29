angular.module('radcup').controller('mapController', function($scope, locationService, $location, gamesService, $state, $ionicPopup) {
    /* mapController dient als Bindeglied zwischen der map view und
    der location.getPosition function. */
    $scope.show = {};
    $scope.isVisible = false;
    var button = document.getElementById('startMapButton');
    button.style.visibility = 'hidden';
    var chosenPosition = null;
    // position abrufen
    locationService.getPosition().then(function(position) {
        var markers = [];
        //neue map anlegen, mit entsprechenden Paramtern wie zoom etc.
        if (!position) {
            showError();
            return;
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            center: position,
            scrollwheel: false,
            zoom: 17
        });
        //neuen Marker mit eigener Position auf Map anlegen
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Your Position!',
            icon: './img/location-icons/my-location.svg'
        });
        //neuen click Listener anlegen wird für addMarker benötigt
        map.addListener('click', function(event) {
            clearMarkers();
            $scope.isVisible = true;
            var divSel = document.getElementById('overlay');
            divSel.style.top = event.pixel.y + 10 + "px";
            divSel.style.left = event.pixel.x - 25 + "px";
            button.style.visibility = 'visible';
            chosenPosition = event.latLng;

            setStreetFromClick();
            console.log(chosenPosition);
            addMarker(chosenPosition);
        });
        // Marker auf Map nach Click setzen (blaue Fahne)
        function addMarker(location) {

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: './img/location-icons/set-gamelocation.svg'
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
    }, function(error) {

        showError();
    });

    //neues Spiel anlegen, anschließend auf main.games umleiten.
    $scope.createGame = function() {
        gamesService.createNewGame(chosenPosition).then(function() {

            $state.go('main.games');
        }, function(error) {
            if (error == null) {
                console.log("fail in mapController");
            }
        });
    }
    setStreetFromClick = function() {
        var geocoder = new google.maps.Geocoder();
        var location = new google.maps.LatLng(chosenPosition.lat(), chosenPosition.lng());
        geocoder.geocode({
            'latLng': location
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var add = results[0].formatted_address;
                $scope.$apply(function() {
                    $scope.show = add;
                });
            }
        });
    }

    showError = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Location Error',
            template: 'Either your location settings are not activated, the app has no location permission or your smartphone is not able to get a current position. Turn on your location settings, turn on the location permission in the apps permission settings or try going outside.',
            okType: 'button-assertive'
        });

        alertPopup.then(function(res) {
            console.log('Location Error');
            $state.go('new_game');
        });
    }


});
