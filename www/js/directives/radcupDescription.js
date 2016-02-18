angular.module('radcup').directive('radcupDescription', function () {
  return {
    restrict: 'AE',
    scope: {
      game: '='
    },
    templateUrl: '/templates/partials/radcup-description.html'
  };
});
