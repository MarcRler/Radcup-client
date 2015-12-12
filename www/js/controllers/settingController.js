angular.module('radcup').controller('settingController', function($scope, $rootScope,$http, $location, $window, $ionicPopup, $httpParamSerializerJQLike) {
  $scope.settings = {};
                  console.log($http.defaults.headers.common.Authorization);



$scope.updateSettingForm = function() {

  var uemail;
  var uuname;
  var upassword;

   if($scope.settings.email===$rootScope.email || $scope.settings.email===''){
     uemail=$rootScope.email;
   } else {
     uemail=$scope.settings.email;
   }
   if($scope.settings.username===$rootScope.username || $scope.settings.username===''){
     uuname=$rootScope.username;
   } else {
     uuname=$scope.settings.username;
   }
   if($scope.settings.password===$rootScope.password || $scope.settings.email===''){
     upassword=$rootScope.password;
   } else {
     upassword=$scope.settings.password;
   }



  console.log($http.defaults.headers.common.Authorization);
  $http({
    method: 'PUT',
    url: 'http://localhost:3000/api/users/'+$rootScope._id,
    data: "username=" + encodeURIComponent(uuname) +
          "&password=" + encodeURIComponent(upassword)+
          "&email=" + encodeURIComponent(uemail),
    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
  })
    .then(function successCallback(response) {
                  console.log("User updated: ");
                if ($scope.settings.password!==$rootScope.password){
                  console.log("muss neuen header setzen");
                }
                  console.log(response);
                  }, function errorCallback(response){
              alert(response);
          });
};
});
