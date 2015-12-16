angular.module('radcup').service('userService', function($q, $http, $httpParamSerializerJQLike){
  var host = 'http://localhost:3000/api/users/';

 this.login =function(login){
    console.log(login);
    return $q(function(resolve, reject){
      $http({
          method: 'GET',
          url: host + login.email,
          headers:  {
          'Authorization' : 'Basic '+ btoa(login.email+':'+login.password),
          'Content-Type': 'application/x-www-form-urlencoded'
          }
          }).then(
          function(data) {
            console.log("erfolg");
           if(login.email === data.data.email) {
             this.persistData(data,login);
              resolve(data);
           }else {
             alert("something strange");
           }

           },
           function(error) {
           console.log('error');
           reject(error);
        });
     });


    }

  this.register =function(user){
     return $q(function(resolve, reject){
       $http({
           method: 'POST',
           url: host,
           data:user

           }).then(
           function(data) {
             console.log("erfolg --> PROBLEM IM BACKEND immer 200 RES");
             resolve(data);
            },
            function(error) {
            console.log('error');
            reject(error);
         });
      });
     }

  persistData = function(res,login){
    console.log('persistData');
    window.localStorage['email'] = login.email;
    window.localStorage['password']=login.password;
    window.localStorage['username']=res.data.username;
    window.localStorage['userid']=res.data._id;

  };

  this.setUserHeader = function(){
    var email=window.localStorage['email'];
    var password=window.localStorage['password'];
    $http.defaults.headers.common.Authorization = 'Basic '+ btoa(email+':'+password);
    console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
    return true;
  };

  this.logout = function(){
   delete $http.defaults.headers.common['Authorization'];
   return true;
  }


   }

);
