(function () {
  'use strict';

  angular
    .module('bsDaocHeraldApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngAnimate'
    ])
    .config(function ($routeProvider, $httpProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/search/c/:clusterId/:searchStr', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/search/g/:searchStr', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/guild/:guildId', {
          templateUrl: 'views/guild.html',
          controller: 'GuildCtrl'
        })
        .when('/character/:charId', {
          templateUrl: 'views/character.html',
          controller: 'CharacterCtrl'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .otherwise({
          redirectTo: '/login'
        });

      // Intercept 401s and redirect you to login
      $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
        return {
          'responseError': function(response) {
            console.log('interceptor error: ' + response.status);
            if(response.status === 401) {
              console.log('redirecting to /login');
              $location.path('/login');
              return $q.reject(response);
            }
            else {
              console.log('unhandled error');
              return $q.reject(response);
            }
          }
        };
      }]);
    })
    .constant('BASE_URL', 'http://web_dev1.broadsword.com:8090')
    .constant('REALM', ['Unknown', 'Albion', 'Midgard', 'Hibernia']);


}());