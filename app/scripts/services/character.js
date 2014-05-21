(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Character', function ($resource, BASE_URL, $cookieStore) {
      return $resource(BASE_URL + '/character/info/:charId', {}, {
        query: {method: 'GET', params: {}, isArray: false, headers: { 'Authorization': 'Basic ' + $cookieStore.get('authdata') }}
      });
    });

}());