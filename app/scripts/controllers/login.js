(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('LoginCtrl', function ($scope, Auth) {

      $scope.initAuth = function() {
        Auth.clearCredentials();
      };

      $scope.login = function() {
        if( !$scope.username || !$scope.password ) {
          return;
        }

        Auth.setCredentials($scope.username, $scope.password);
      };

    });

}());