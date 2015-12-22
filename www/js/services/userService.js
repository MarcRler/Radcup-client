angular.module('radcup').service('userService', function($q, $http, $httpParamSerializerJQLike){
  var host = 'http://localhost:3000/api/users/';

 this.login =function(login){
    console.log(login);
    return $q(function(resolve, reject){
      $http({
          method: 'GET',
          url: host+login.email,
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
    //delete auth header!
   delete $http.defaults.headers.common['Authorization'];
   console.log($http.defaults.headers.common['Authorization']);
   //delete locale credentials
   delete window.localStorage['email'];
   delete window.localStorage['password'];
   delete window.localStorage['username'];
   delete window.localStorage['userid'];
   return true;
  }

  this.update = function(settings){
    console.log(settings);
    $http.defaults.headers.post["Content-Type"] = "application/json";
  return $q(function(resolve, reject){
    var uemail=''; //updated email
    var uuname=''; //updated username
    var upassword=''; //updated password
    /*prüfe ob credentials im lokal storage dem entsprechen was mit geliefert wurde oder leer war,
    wenn ja gibt es nichts zum updaten und nutze die informationen aus dem local storage für PUT - es wird also mit bereits bekannten daten geupdated  */
     if(settings.email===window.localStorage['email'] || settings.email===undefined){
       uemail=window.localStorage['email'];
     } else {
       uemail=settings.email;
     }
     if(settings.username===window.localStorage['username'] || settings.username===undefined){
       uuname=window.localStorage['username'];
     } else {
       uuname=settings.username;
     }
     if(settings.password===window.localStorage['password'] || settings.password===undefined){
       upassword=window.localStorage['password'];
     } else {
       upassword=settings.password;
     }

    console.log('new username: '+uuname);
    console.log('new email: '+uemail);
    console.log('new password: '+upassword);
    //Json zusammen bauen von Hand -> ist evtl. nicht besonders gut. sollte mit einer funktion gemacht werden!
    var jsonData = '{"username":'+'"'+uuname+'","password":'+'"'+upassword+'","email":"'+uemail+'"}';
    console.log(jsonData);
    console.log($http.defaults.headers.common.Authorization);
    $http({
      method: 'PUT',
      url: host+window.localStorage['userid'],
      data: jsonData})
      .then(function (data) {
                    console.log("User updated: ");
                    resolve(data)
          }, function (error){
                  console.log('error');
                  reject(error);
            });
          });

  }



});
