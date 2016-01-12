// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radcup', ['ionic', 'ngCordova' , 'ui.router', 'ngResource'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //check cordova internet Connection of the devices!
    if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: 'No Internet Connection',
              content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
          }
        }

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'templates/landing.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html'
    })
    .state('explore', {
      url: '/explore',
      templateUrl: 'templates/explore.html'
    })
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'templates/main.html'
    })
    .state('main.games', {
      url: '/games',
      views: {
        'main-games': {
          templateUrl: 'templates/main-games.html'
        }
      }
    })
    .state('main.settings', {
      url: '/settings',
      views: {
        'main-settings': {
          templateUrl: 'templates/main-settings.html'
        }
      }
    })
    .state('main.myGames', {
      url: '/myGames',
      views: {
        'main-myGames': {
          templateUrl: 'templates/myGames.html'
        }
      }
    })
    .state('new_game', {
      url: '/newGame',
      templateUrl: 'templates/new_game.html'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html'
    })
    .state('getGame', {
      url: '/games/:id',
      templateUrl: 'templates/game.html'
    })
    .state('gameOverview', {
      url: '/games/:id',
      templateUrl: 'templates/gameOverview.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
