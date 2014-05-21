(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
  .factory('Auth', ['Base64', '$cookieStore', '$http', '$location', function (Base64, $cookieStore, $http, $location) {
    // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');

    return {
      isLoggedIn: function() {
        return $cookieStore.get('authdata');
      },
      setCredentials: function (username, password) {
        var encoded = Base64.encode(username + ':' + password);
        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $cookieStore.put('authdata', encoded);
        $location.path('/search');
      },
      clearCredentials: function () {
        document.execCommand('ClearAuthenticationCache');
        $cookieStore.remove('authdata');
        $http.defaults.headers.common.Authorization = 'Basic ';
      }
    };
  }]);

}());