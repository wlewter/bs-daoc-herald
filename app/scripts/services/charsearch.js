(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Charsearch', function ($resource, BASE_URL, $rootScope) {
      return $resource(BASE_URL + '/character/search?name=:searchStr&cluster=:clusterId', {}, {
        query: {method: 'GET', params: {}, isArray: false, headers: { 'Authorization': 'Basic ' + $rootScope.authData }}
      });
    });

}());