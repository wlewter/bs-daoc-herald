(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('LastOn', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/data/laston', {}, {
        query: {method: 'GET', params: {}, isArray: false}
      });
    });

}());