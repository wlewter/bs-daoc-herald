(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Guild', function ($resource, BASE_URL/*, $rootScope*/) {
      return $resource(BASE_URL + '/guild/info/:guildId', {}, {
        query: {method: 'GET', params: {}, isArray: false/*, headers: { 'Authorization': 'Basic ' + $rootScope.authData }*/}
      });
    });

}());