angular.module('radcup').directive('radcupLocation', function () {
  return {
    scope: true,
    controller: 'gameOverviewController',
    templateUrl: './templates/partials/radcup-location.html'
  };
});
