(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
  .factory('Auth', ['Base64', '$rootScope', '$location', '$cookieStore', function (Base64, $rootScope, $location, $cookieStore) {
    // initialize to whatever is in the cookie, if anything
    //$http.defaults.headers.common.Authorization = 'Basic ' + $cookieStore.get('authdata');

    return {
      //isLoggedIn: function() {
      //  return true;
      //},
      setCredentials: function (username, password) {
        var encoded = Base64.encode(username + ':' + password);
        //$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $cookieStore.put('authdata', encoded);
        $rootScope.authData = encoded;

        // stupid line to force cookie to be set before moving on....
        Base64.decode($cookieStore.get('authdata'));

        $location.path('/search');
      },
      clearCredentials: function () {
        document.execCommand('ClearAuthenticationCache');
        $cookieStore.remove('authdata');
        $rootScope.authData = '';
        //$http.defaults.headers.common.Authorization = 'Basic ';
      }
    };
  }]);

}());