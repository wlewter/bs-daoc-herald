(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Roster', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/guild/:serverId/:guildId/:guildKey/roster?pageNumber=:pageNumber&sortType=:sortType', {}, {
        query: {method: 'GET', params: {}, isArray: false}
      });
    });

}());