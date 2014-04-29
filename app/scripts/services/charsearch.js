(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Charsearch', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/character/:clusterId/search?name=:searchStr', {}, {
        query: {method: 'GET', params: {}, isArray: true}
      });
    });

}());