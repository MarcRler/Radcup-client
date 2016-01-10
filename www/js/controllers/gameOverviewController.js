angular.module('radcup').controller('gameOverviewController', function($scope, gamesService,$stateParams,$state) {


  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on('$ionicView.enter', function () {
    $scope.loadGame();
  });


  $scope.loadGame = function () {
    $scope.game = gamesService.allGames().get({ id: $stateParams.id });

    $scope.game.$promise.then(function(data) {

      if($scope.game.players.one===window.localStorage.username){
        if($scope.game.state=='startable'){
        setButtons(1);
      }else if($scope.game.state=='started'){
        setButtons(2);
      }}
   });
  };

  $scope.updateGame = function (param) {

    if(param===1){
      $scope.game.state = "started";
      setButtons(2);
    }else {
      $scope.game.state = "finished";
    }

    console.log($scope.game);
    $scope.game.$update(function () {
      if(param===2){$state.go('main.myGames');
      }
    });
  };

  setButtons = function(param){

    switch (param) {
      case 1:
          document.getElementById('finish').style.display = 'none';
          document.getElementById('start').style.display = 'block';
        break;
      case 2:
          document.getElementById('finish').style.display = 'block';
          document.getElementById('start').style.display = 'none';
        break;
    }
  }

});
