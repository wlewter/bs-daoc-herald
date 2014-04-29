(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Guild', function ($resource, BASE_URL) {
      return $resource(BASE_URL + '/guild/:serverId/:guildId/:guildKey', {}, {
        query: {method: 'GET', params: {}, isArray: false}
      });
    });

}());