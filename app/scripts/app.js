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
        .when('/guild/:serverId/:guildId/:guildKey', {
          templateUrl: 'views/guild.html',
          controller: 'GuildCtrl'
        })
        .when('/character/:clusterId/:serverId/:charId', {
          templateUrl: 'views/character.html',
          controller: 'CharacterCtrl'
        })
        .otherwise({
          redirectTo: '/search'
        });
    })
    .constant('BASE_URL', 'http://web_dev1.broadsword.com:8080')
    .constant('REALM', ['Unknown', 'Albion', 'Midgard', 'Hibernia']);

}());