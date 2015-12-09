angular.module('radcup').controller('registerController', function($scope, $http, $httpParamSerializerJQLike, $location) {

          $scope.user = {};
          $scope.submitForm = function() {
          $http({
            method  : 'POST',
            url     : 'http://localhost:3000/api/users',
          /*  data    : "username=" + encodeURIComponent($scope.user.username) +
                     "&password=" + encodeURIComponent($scope.user.password) +
                     "&email=" + encodeURIComponent($scope.user.email), funktioniert! */
            data: $httpParamSerializerJQLike($scope.user),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
           })
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
                console.log("Success creating: "+data.username);
                $location.path("/register_succes");
                var test = data;
              }
            });
          };

/* Use this for real authentication
           ----------------------------------------------*/
          //$http.post('/api/authenticate', { username: username, password: password })
          //    .success(function (response) {
          //        callback(response);
          //    });
}
);
