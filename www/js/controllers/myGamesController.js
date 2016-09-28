angular.module('radcup').controller('myGamesController', function($scope, $http, gamesService) {

    /* myGameController dient als Bindeglied zwischen der myGames view und
    der gameService.joinedGames function. */

    var gamesList = {};

    $scope.$on('$ionicView.enter', function() {
        //$scope.games = gamesService.joinedGames().query();

        gamesList = gamesService.joinedGames().query();

        gamesList.$promise.then(function(data) {

          console.log(gamesList);

            $scope.groups = [];
            for (var i = 0; i < 3; i++) {
                $scope.groups[i] = {
                    name: "",
                    items: []
                };

                $scope.groups[i].name = $scope.getName(i);
                $scope.groups[i].items = $scope.getItems(i);
            }
        });
    });


    $scope.getName = function(i) {
        switch (i) {
            case 0:
                return "Startable";
            case 1:
                return "Open";
            case 2:
                return "Finished"
            default:
                "Bug"
        }
    }

    $scope.getItems = function(i) {

        var state = $scope.getState(i);
        var items = [];
        for (var j = 0; j < gamesList.length; j++) {

            var game = gamesList[j];

            if (game.state == state) {
                items.push(game);
            }
        }
        return items;
    }

    $scope.getState = function(i) {

        switch (i) {
            case 0:
                return "startable";
            case 2:
                return "finished"
            default:
                "Bug"
        }
    }

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
});
