(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('SearchCtrl', function ($scope, $routeParams, $location, Charsearch, Guildsearch, Clusters) {

      /*if( !Auth.isLoggedIn() ) {
        $location.path('/login');
        return;
      }*/

      $scope.completed = false;
      $scope.charName = '';
      $scope.guildName = '';
      $scope.type = '';
      var MAX_ROWS_DISPLAYED = 150;

      $scope.clusters = Clusters
        .query(function (clusters) {
          if ($routeParams.clusterId) {
            $scope.cluster = _.find(clusters, function (cluster) {
              return cluster.cluster_name == $routeParams.clusterId;
            });
          }
        }, function (response) {
          $scope.completed = true;
          $scope.errorMsg = true;
        });

      if ($location.path().indexOf('/search/g') >= 0) {
        $scope.loading = true;
        $scope.guildName = $routeParams.searchStr;
        $scope.charName = '';
        $scope.type = 'guild';
        $scope.guilds = Guildsearch.query({searchStr: $scope.guildName}, function(guilds) {
          if( guilds.results.length > MAX_ROWS_DISPLAYED ) {
            guilds.results.splice( (guilds.results.length - MAX_ROWS_DISPLAYED) * -1, Number.MAX_VALUE);
          }
          $scope.completed = true;
          $scope.loading = false;
        }, function( response ) {
          $scope.loading = false;
          $scope.completed = true;
          $scope.errorMsg = true;
        });

      } else if ($location.path().indexOf('/search/c') >= 0) {
        $scope.loading = true;
        $scope.charName = $routeParams.searchStr;
        $scope.guildName = '';
        $scope.type = 'char';

        $scope.chars = Charsearch.query({searchStr: $scope.charName, clusterId: $routeParams.clusterId}, function(chars) {

          if( chars.results.length > MAX_ROWS_DISPLAYED ) {
            chars.results.splice( (chars.results.length - MAX_ROWS_DISPLAYED) * -1, Number.MAX_VALUE);
          }
          $scope.completed = true;
          $scope.loading = false;
        }, function( response ) {
          $scope.loading = false;
          $scope.completed = true;
          $scope.errorMsg = true;
        });

      }

      $scope.searchChar = function () {
        if (!$scope.cluster || !$scope.cluster.cluster_name) {
          return;
        }

        if ( $scope.charName !== '' ) {
          $location.path('/search/c/' + $scope.cluster.cluster_name + '/' + $scope.charName);
        }
      };


      $scope.searchGuild = function () {
        if ( $scope.guildName !== '' ) {
          $location.path('/search/g/' + $scope.guildName);
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