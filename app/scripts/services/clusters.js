(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Clusters', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/data/clusters', {}, {
        query: {method: 'GET', params: {}, isArray: true}
      });
    });

}());