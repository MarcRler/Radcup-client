angular.module('radcup').directive('radcupButton', function () {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      outline: '='
    },
    templateUrl: './templates/partials/radcup-button.html'
    }
});
