(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('GuildCtrl', function ($scope, $routeParams, Guild, Roster, REALM, $location, LastOn, Clusters) {

      $scope.completed = false;
      var searchOptions = $location.search();

      /* search stuff */
      $scope.charName = '';
      $scope.guildName = '';

      $scope.clusters = Clusters.query( function(clusters) {
        if( $routeParams.clusterId ) {
          $scope.cluster = _.find(clusters, function (cluster) {
            return cluster.cluster_name == $routeParams.clusterId;
          });
        }
      });

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
      /* end search stuff*/

      $scope.showAlliance = true;
      $scope.hasNext = true;

      $scope.sortBy = searchOptions.sortBy || 'LEVEL';
      $scope.pageNumber = searchOptions.pageNumber || 0;

      $scope.guildData = Guild.query({guildId: $routeParams.guildId}, function (guildData) {

        if( guildData.insignia ) {
          $scope.guildShield = '../images/shields/' + guildData.insignia.insignia_color_one + '-' + guildData.insignia.insignia_color_two + '-' + guildData.insignia.insignia_pattern + '-full.png';
          if( guildData.insignia.insignia_emblem === 0 ) {
            $scope.guildEmblem = '../images/insignia/blank.gif';
          } else {
            var zeroPadding = guildData.insignia.insignia_emblem < 10 ? '00' : guildData.insignia.insignia_emblem < 100 ? '0' : '';
            $scope.guildEmblem = '../images/insignia/emblem_' + zeroPadding + guildData.insignia.insignia_emblem + '.gif';
          }
        }

        $scope.getRoster(guildData.guild_web_id, $scope.pageNumber, $scope.sortBy);
      });

      $scope.sortByChange = function () {
        $scope.pageNumber = 0;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy);
      };

      $scope.nextPage = function () {
        ++$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy);
      };

      $scope.prevPage = function () {
        --$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy);
      };


      $scope.getRoster = function (guildId, pageNumber, sortType) {
        $scope.rosterData = Roster.query({guildId: guildId, pageNumber: pageNumber, sortType: sortType}, function (rosterData) {
          if (rosterData.roster && rosterData.roster.length > 0) {

            LastOn.query(function(laston) {
              for(var i = 0; i < rosterData.roster.length; i++) {
                rosterData.roster[i].laston = laston[rosterData.roster[i].last_on_range];
              }
            });
            $scope.realm = REALM[rosterData.roster[0].realm];
            if( rosterData.roster.length < rosterData.per_page ) {
              $scope.hasNext = false;
            } else {
              $scope.hasNext = true;
            }
          } else {
            $scope.hasNext = false;
          }

          $scope.completed = true;
        });
      };

    });
}());


