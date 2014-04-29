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
    .config(function ($routeProvider) {
      $routeProvider
        .when('/search', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/search/c/:clusterId/:searchStr', {
          templateUrl: 'views/search.html',
          controller: 'SearchCtrl'
        })
        .when('/search/g/:clusterId/:searchStr', {
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
        .otherwise({
          redirectTo: '/search'
        });
    })
    .constant('BASE_URL', 'http://web_dev1.broadsword.com:8090')
    .constant('REALM', ['Unknown', 'Albion', 'Midgard', 'Hibernia']);

}());