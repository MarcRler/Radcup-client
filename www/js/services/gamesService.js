angular.module('radcup').service('gamesService', function($q, $http, $httpParamSerializerJQLike, $resource) {

/* allGames function, wird genutzt um via PUT und $resoucrce ein vorhandes Spiel upzudaten
PUT dient in diesem Fall auch als POST/GET -> liefert einen promise zurück
Siehe auch ng-resource Dokumentation
*/
  this.allGames = function () {
    return $resource('http://haagim.net/nodejs/api/games/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  };

/* joinableGames function, liefert alle Spiele zurück welchen beigetreten
werden kann
*/
  this.joinableGames = function () {
    return $resource('http://haagim.net/nodejs/api/joinableGames');
  };

/* joinedGames function, liefert alle Spiele zurück in denen der User bereits
eingetragen ist. Egal ob von im erstellt oder ob er beigetreten ist.
*/
  this.joinedGames = function() {
    return $resource('http://haagim.net/nodejs/api/myGames');
  };
  var newGame = null;

/* setGame function, liefert ein neues Spiel Object zurück welches in der createNewGame
function genutzt wird.
*/
  this.setGame = function(game) {

    this.newGame = game;
    console.log(this.newGame);
  }

/* createNewGame function, nutzt zuvor neu erzeugtes Spiel und setzt gewählte
Spiel Position ein. Anschließend wird via promise dieses Spiel gepostet um in der
Datenbank zu perstieren. */
  this.createNewGame = function(chosenPosition) {
    var self = this;

    console.log(newGame);
    this.newGame.lat = chosenPosition.lat();
    this.newGame.lng = chosenPosition.lng();

    console.log(this.newGame);

    return $q(function(resolve, reject) {
      $http.post('http://haagim.net/nodejs/api/games', self.newGame)
      .then(function(data) {
          console.log(data);
          resolve();
        },
        function(error) {
          reject();
        });
    });
  };
});
