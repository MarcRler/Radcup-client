// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('radcup', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
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
    .state('loginSuccess', {
      url: '/loginSuccess',
      templateUrl: 'templates/loginSuccess.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html'
    })
    .state('register_succes', {
      url: '/register_succes',
      templateUrl: 'templates/register_succes.html'
    })
    .state('main', {
      url: '/main',
      // abstract: true,
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
    .state('new_game', {
      url: '/newGame',
      templateUrl: 'templates/new_game.html'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'templates/map.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
