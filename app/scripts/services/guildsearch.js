(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Guildsearch', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/guild/search?name=:searchStr', {}, {
        query: {method: 'GET', params: {}, isArray: false}
      });

    });

}());