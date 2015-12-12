angular.module('radcup').directive('map',function(){
  return {
    restrict: 'E',
    template: "<div></div>",
    scope: { "position": "=" },
    link: function(scope, element, attrs){
      scope.$watch("position", function(p){
        if(!p) return;
        var map = new google.maps.Map(element[0], {
          center: p,
           scrollwheel: false,
           zoom: 14
         });
      });
    }
  }
});
