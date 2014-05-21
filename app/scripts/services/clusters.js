(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Clusters', function ($resource, BASE_URL, $cookieStore, Base64) {

      return $resource(BASE_URL + '/data/clusters', {}, {
        query: {method: 'GET', params: {}, isArray: true, headers: { 'Authorization': 'Basic ' + $cookieStore.get('authdata') }}
      });
    });

}());