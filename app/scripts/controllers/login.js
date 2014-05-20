(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('LoginCtrl', function ($scope, $location, Auth) {

      $scope.login = function() {
        Auth.setCredentials($scope.username, $scope.password);
        $location.path('/search');
      };

    });

}());