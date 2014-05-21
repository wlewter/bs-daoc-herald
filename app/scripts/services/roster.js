(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Roster', function ($resource, BASE_URL, $cookieStore) {
      return $resource(BASE_URL + '/guild/roster/:guildId?pageNumber=:pageNumber&sortType=:sortType', {}, {
        query: {method: 'GET', params: {}, isArray: false, headers: { 'Authorization': 'Basic ' + $cookieStore.get('authdata') }}
      });
    });

}());