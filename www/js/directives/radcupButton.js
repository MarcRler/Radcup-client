angular.module('radcup').directive('radcupButton', function () {
  return {
    restrict: 'AE',
    transclude: true,
    templateUrl: '/templates/partials/radcup-button.html'
  };
});
