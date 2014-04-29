(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('RealmRanks', function ($resource) {
      return $resource('./json/realm_ranks.json', {}, {
        query: {method: 'GET', params: {}, isArray: true}
      });
    });

}());