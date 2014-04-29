(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('SearchCtrl', function ($scope, $routeParams, $location, Charsearch, Guildsearch) {

      $scope.completed = false;
      $scope.charName = '';
      $scope.guildName = '';
      $scope.cluster = {};
      $scope.clusters = [
        {name: 'Ywain', id: 41},
        {name: 'Gaheris', id: 23},
        {name: 'Pendragon', id: 5}
      ];
      $scope.type = '';

      if ($location.path().indexOf('/search/g') >= 0) {
        $scope.guildName = $routeParams.searchStr;
        $scope.charName = '';
        $scope.cluster = _.find($scope.clusters, function( cluster ) {
          return cluster.id == $routeParams.clusterId;
        });
        $scope.type = 'guild';
        $scope.results = Guildsearch.query({searchStr: $scope.guildName}, function() {
          $scope.completed = true;
        });

      } else if ($location.path().indexOf('/search/c') >= 0) {
        $scope.charName = $routeParams.searchStr;
        $scope.cluster = _.find($scope.clusters, function( cluster ) {
          return cluster.id == $routeParams.clusterId;
        });
        $scope.guildName = '';
        $scope.type = 'char';
        $scope.results = Charsearch.query({searchStr: $scope.charName, clusterId: $routeParams.clusterId}, function() {
          $scope.completed = true;
        });

      }


      $scope.search = function () {
        if (!$scope.cluster || !$scope.cluster.id) {
          return;
        }

        if ( $scope.charName !== '' ) {
          $location.path('/search/c/' + $scope.cluster.id + '/' + $scope.charName);
        } else if ( $scope.guildName !== '' ) {
          $location.path('/search/g/' + $scope.cluster.id + '/' + $scope.guildName);
        }
      };

      $scope.clearGuild = function () {
        $scope.guildName = '';
      };

      $scope.clearChar = function () {
        $scope.charName = '';
      };


      $scope.completed = true;
    });

}());