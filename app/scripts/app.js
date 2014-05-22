(function () {
  'use strict';

  angular
    .module('bsDaocHeraldApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute'
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
            if(response.status === 401) {
              window.location.href='./logout.html';
              return $q.reject(response);
            }
            else {
              return $q.reject(response);
            }
          }
        };
      }]);

    })
    //.constant('BASE_URL', 'http://web_dev1.broadsword.com:8090')
    .constant('BASE_URL', 'https://herald-api.dev.broadsword.com')
    .constant('REALM', ['Unknown', 'Albion', 'Midgard', 'Hibernia'])
    .run( function($rootScope, $cookieStore) {
      $rootScope.authData = $cookieStore.get('authdata');
    });


}());