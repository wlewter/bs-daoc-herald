(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .factory('Guildsearch', function ($resource, BASE_URL/*, $rootScope*/) {
      return $resource(BASE_URL + '/guild/search?name=:searchStr', {}, {
        query: {method: 'GET', params: {}, isArray: false/*, headers: { 'Authorization': 'Basic ' + $rootScope.authData }*/}
      });

    });

}());