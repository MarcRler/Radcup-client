angular.module('radcup').service('gamesService', function($q, $http, $httpParamSerializerJQLike) {

  var newGame = null;

  this.setGame = function(game) {

    this.newGame = game;
    console.log(this.newGame);
  }

  this.createNewGame = function(chosenPosition) {
    var self = this;

    console.log(newGame);
    this.newGame.lat = chosenPosition.lat();
    this.newGame.lng = chosenPosition.lng();

    console.log(this.newGame);

    return $q(function(resolve, reject) {
      $http.post('http://localhost:3000/api/games', self.newGame)
      .then(function(data) {
          console.log(data);
          resolve();
        },
        function(error) {
          reject();
        });
    });
  };

  this.getGames = function(url) {
    return $q(function(resolve, reject){
      $http.get(url)
      .then(function(data){
        resolve(data);
      },
      function(error){
        reject();
      });
    });
  };
});
