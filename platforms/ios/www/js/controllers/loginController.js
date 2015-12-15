angular.module('radcup').controller('loginController', function($scope, $rootScope, $http, $httpParamSerializerJQLike, $location) {

  $scope.login = {};
  /* TODO: Use this in server.js Radcup-Backend 4 CORS - authentication
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/
  $scope.submitLoginForm = function() {
  $http.get('http://localhost:3000/api/users/'+$scope.login.email, {
            headers:  {
              'Authorization' : 'Basic '+ btoa($scope.login.email+':'+$scope.login.password),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function successCallback(response) {
                  console.log("Login getting: ");
                  if ($scope.login.email === response.data.email){
                      console.log("email response is valid now setting default headers!")
                      $http.defaults.headers.common.Authorization = 'Basic '+ btoa($scope.login.email+':'+$scope.login.password);
                      $rootScope.email=$scope.login.email;
                      $rootScope.password=$scope.login.password;
                      $rootScope.username=response.data.username;
                      $rootScope._id=response.data._id;
                      console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
                  }
                  $location.path("/main");
          }, function errorCallback(response){
              if(response.status===401 || response.data==='Unauthorized'){
                console.log("Information from Backend:Unauthorized - Please use valid credentials!")

              } else {
                alert('unknown error occured')
              }


          });
        };

$scope.logout= function(){
  delete $http.defaults.headers.common['Authorization'];
  $rootScope.email="";
  console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
  alert ("user logout success");
    $location.path("/login");
     };
})
;
