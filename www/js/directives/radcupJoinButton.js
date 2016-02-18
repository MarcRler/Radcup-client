angular.module('radcup').directive('radcupJoinButton', function () {
  return {
    restrict: 'AE',
    scope: {
      assertive: '=',
      balanced: '='
    },
    templateUrl: '/templates/partials/radcup-join-button.html'
  };
});
