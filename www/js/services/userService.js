angular.module('radcup').service('userService', function($q, $http, $resource, $httpParamSerializerJQLike){
  var host = 'http://haagim.net/nodejs/api/users/';

/*checkApi function, wird dazu genutzt um zu überprüfen ob das Backend auch läuft
*/
this.checkApi=function(login){
  return $q(function(resolve,reject){
    $http({
      method: 'GET',
      url: 'http://haagim.net/nodejs/api'
    }).then(
      function(data){
        console.log('success calling the api');
        resolve(data);
      },function(error){
        console.log("error: "+error);
        reject(error);
      });
  });
}

/*Login function, get auf einen bestehenden benutzer mit dessen email.
Authorization basic mit email und password. Wenn dieser in Backend vorhanden ist
und die verwendete email der email Adresse welche im Get zurück entspricht wird
persistData function aufgerufen.
*/
 this.login =function(login){
    console.log(login);
    return $q(function(resolve, reject){
      $http({
          method: 'GET',
          url: host+login.email,
          headers:  {
          'Authorization' : 'Basic '+ btoa(login.email+':'+login.password)
          }
          }).then(
          function(data) {
            console.log("success");
           if(login.email === data.data.email) {
             this.persistData(data,login);
              resolve(data);
           }else {
             console.log("fail in the userService");
           }

           },
           function(error) {
           console.log('error');
           reject(error);
        });
     });
    }

/*register function, wird genutzt um via POST einen neuen Benutzer zu regestieren
Aus view werden die "user" data elemente hierfür genutzt.
*/
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

/* Alle Daten welche beim login eingegeben wurden werden im lokalen Speicher abgelegt
um diese für spätere Funktionalitäten und dem zusammensetzen des HTTP Authorization
headers vorhanden zu sein. function wird von login function gerufen
*/
  persistData = function(res,login){
    console.log('persistData');
    window.localStorage['email'] = login.email;
    window.localStorage['password']=login.password;
    window.localStorage['username']=res.data.username;
    window.localStorage['userid']=res.data._id;

  };
/* diese function dient dem zusammensetzen des HTTP Default Authorization header
es werden die zuvor gespeicherten values "email" und password hierfür genutzt.
Wenn es funktioniert hat wird ein True geliefert.
*/
  this.setUserHeader = function(){
    var email=window.localStorage['email'];
    var password=window.localStorage['password'];
    $http.defaults.headers.common.Authorization = 'Basic '+ btoa(email+':'+password);
    console.log('default header upon is: '+$http.defaults.headers.common.Authorization);
    return true;
  };
/* logout function leert http default header und local storage
*/
  this.logout = function(){
    //delete auth header!
   delete $http.defaults.headers.common['Authorization'];
   console.log("this should undefined: "+$http.defaults.headers.common['Authorization']);
   //delete locale credentials
   delete window.localStorage['email'];
   delete window.localStorage['password'];
   delete window.localStorage['username'];
   delete window.localStorage['userid'];
   console.log("localStorage userid should be undefined: "+window.localStorage['userid']);
   return true;
  }
/* update function wird genutzt um dem User die Möglicheit zu bieten seine Email
oder password ändern zu können.
*/
  this.update = function(settings){
    console.log("hui settings mail"+settings.email);
    console.log("hui settings pw"+settings.password);
    console.log("hui settings pw"+settings.username);


    $http.defaults.headers.post["Content-Type"] = "application/json";
  return $q(function(resolve, reject){
    var uemail=''; //updated email
    var uuname=''; //updated username -> username ist uniq darf nicht mehr geupdated werden. wird in view nicht angeboten.
    var upassword=''; //updated password
    console.log("1:"+uemail);
    console.log("settings.email :"+settings.email);

    console.log("2:"+uuname);
    console.log("settings.username :"+settings.username);

    console.log("3:"+upassword);
    console.log("settings.password :"+settings.password);


    /*prüfe ob credentials im lokal storage dem entsprechen was mit geliefert wurde oder leer war,
    wenn ja gibt es nichts zum updaten und nutze die informationen aus dem local storage für PUT - es wird also mit bereits bekannten daten geupdated  */
     if(settings.email===window.localStorage['email'] || settings.email===undefined || settings.email===''){
       uemail=window.localStorage['email'];
     } else {
       uemail=settings.email;
     }
     if(settings.username===window.localStorage['username'] || settings.username===undefined){
       uuname=window.localStorage['username'];
     } else {
       uuname=settings.username;
     }
     if(settings.password===window.localStorage['password'] || settings.password===undefined|| settings.password==='' ){
       upassword=window.localStorage['password'];
     } else {
       upassword=settings.password;
     }

    console.log('new username: '+uuname);
    console.log('new email: '+uemail);
    console.log('new password: '+upassword);
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
