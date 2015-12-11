angular.module('radcup').controller('loginController', function($scope, $http, $httpParamSerializerJQLike, $location) {

  $scope.login = {};
  /* TODO: Use this in server.js 4 CORS - authentication
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/
  $scope.submitLoginForm = function() {
  $http.get('http://localhost:3000/api/users/'+$scope.login.email, {
            headers:  {
              'Authorization' : 'Basic '+ btoa($scope.login.email+':'+$scope.login.password),
              'Content-Type': 'application/x-www-form-urlencoded'
            }
            })
//TODO: .success soll nicht mehr genutzt werden mit 1.5! -> then nutzen! Error Handling 401 einbauen! 
    .success(function(data) {
      if (data.error) {
        // Showing errors.
        console.log(data.error.message);

        if (data.error.errmsg){
          $scope.user.email=data.error.errmsg;

        }else {
          if (data.error.errors.email)
            $scope.user.email=data.error.errors.email.message;

          if (data.error.errors.username)
              $scope.user.username=data.error.errors.username.message;

          if (data.error.errors.password)
              $scope.user.password=data.error.errors.password.message;

        }

      } else {
        console.log("Login getting: ");
//TODO: gehört in einen service!
       if ($scope.login.email === data.email){
         console.log("email response is valid now setting default headers!")
            $http.defaults.headers.common.Authorization = 'Basic '+ btoa($scope.login.email+':'+$scope.login.password);
         console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
       }
        $location.path("/loginSuccess");
      }
    });
  };

$scope.logout= function(){
  delete $http.defaults.headers.common['Authorization'];
  console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
  alert ("user logout success");
    $location.path("/login");
     };
}
);
