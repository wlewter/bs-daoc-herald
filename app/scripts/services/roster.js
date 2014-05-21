(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Roster', function ($resource, BASE_URL, $rootScope) {
      return $resource(BASE_URL + '/guild/roster/:guildId?pageNumber=:pageNumber&sortType=:sortType&perPage=:perPage', {}, {
        query: {method: 'GET', params: {}, isArray: false, headers: { 'Authorization': 'Basic ' + $rootScope.authData }}
      });
    });

}());