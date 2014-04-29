(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('SearchCtrl', function ($scope, $routeParams, $location, Charsearch, Guildsearch, Clusters) {

      $scope.completed = false;
      $scope.charName = '';
      $scope.guildName = '';

      $scope.clusters = Clusters.query( function(clusters) {
        $scope.cluster = _.find(clusters, function( cluster ) {
          return cluster.cluster_name == $routeParams.clusterId;
        });
      });

      $scope.type = '';

      if ($location.path().indexOf('/search/g') >= 0) {
        $scope.guildName = $routeParams.searchStr;
        $scope.charName = '';
        $scope.type = 'guild';
        $scope.guilds = Guildsearch.query({searchStr: $scope.guildName}, function() {
          $scope.completed = true;
        });

      } else if ($location.path().indexOf('/search/c') >= 0) {
        $scope.charName = $routeParams.searchStr;
        $scope.guildName = '';
        $scope.type = 'char';
        $scope.chars = Charsearch.query({searchStr: $scope.charName, clusterId: $routeParams.clusterId}, function() {
          $scope.completed = true;
        });

      }


      $scope.search = function () {
        if (!$scope.cluster || !$scope.cluster.cluster_name) {
          return;
        }

        if ( $scope.charName !== '' ) {
          $location.path('/search/c/' + $scope.cluster.cluster_name + '/' + $scope.charName);
        } else if ( $scope.guildName !== '' ) {
          $location.path('/search/g/' + $scope.cluster.cluster_name + '/' + $scope.guildName);
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