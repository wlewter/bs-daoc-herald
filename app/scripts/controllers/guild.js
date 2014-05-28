(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('GuildCtrl', function ($scope, $routeParams, Guild, Roster, REALM, $location, LastOn, Clusters) {

      $scope.sortOptions = [
        { name: 'LEVEL', value: 'Level' },
        { name: 'CLASS', value: 'Class' },
        { name: 'NAME',  value: 'Name'  },
        { name: 'RANK',  value: 'Guild Rank' },
        { name: 'REALM_POINTS', value: 'Realm Points'}
      ];

      $scope.lastseenColors = [
        '#00a56b',
        '#317bca',
        '#f7d600',
        '#ff9c29',
        '#f03942',
        '#ffffff'
      ]

      $scope.completed = false;
      //var searchOptions = $location.search();

      /* search stuff */
      $scope.charName = '';
      $scope.guildName = '';

      $scope.clusters = Clusters.query( function(clusters) {
        if( $routeParams.clusterId ) {
          $scope.cluster = _.find(clusters, function (cluster) {
            return cluster.cluster_name == $routeParams.clusterId;
          });
        } else {
          $scope.cluster = _.find(clusters, function (cluster) {
            return cluster.cluster_name.toLowerCase() === 'ywain';
          });
        }
      }, function( response ) {
        $scope.errorMsg = true;
      });

      $scope.searchChar = function () {
        if (!$scope.cluster || !$scope.cluster.cluster_name) {
          return;
        }

        if ( $scope.charName !== '' && $scope.charName.length >= 3) {
          $location.path('/search/c/' + $scope.cluster.cluster_name + '/' + $scope.charName);
        }
      };


      $scope.searchGuild = function () {

        if ( $scope.guildName !== '' && $scope.guildName.length >= 3) {
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

      $scope.sortBy = { name: $scope.sortOptions[0].name};

      $scope.pageNumber = 0;
      $scope.perPage = 50;

      $scope.guildData = Guild.query({guildId: $routeParams.guildId}, function (guildData) {

        if( guildData.insignia ) {
          $scope.guildShield = 'images/shields/' + guildData.insignia.insignia_color_one + '-' + guildData.insignia.insignia_color_two + '-' + guildData.insignia.insignia_pattern + '-full.png';
          if( guildData.insignia.insignia_emblem === 0 ) {
            $scope.guildEmblem = 'images/insignia/blank.gif';
          } else {
            var zeroPadding = guildData.insignia.insignia_emblem < 10 ? '00' : guildData.insignia.insignia_emblem < 100 ? '0' : '';
            $scope.guildEmblem = 'images/insignia/emblem_' + zeroPadding + guildData.insignia.insignia_emblem + '.gif';
          }
        }

        $scope.getRoster(guildData.guild_web_id, $scope.pageNumber, $scope.sortBy.name, $scope.perPage);

      }, function( response ) {
        $scope.completed = true;
        $scope.errorMsg = true;
      });


      $scope.sortByChange = function () {
        $scope.pageNumber = 0;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy.name, $scope.perPage);
      };

      $scope.nextPage = function () {
        ++$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy.name, $scope.perPage);
      };

      $scope.prevPage = function () {
        --$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_web_id, $scope.pageNumber, $scope.sortBy.name, $scope.perPage);
      };

      $scope.getRoster = function (guildId, pageNumber, sortType, perPage) {
        $scope.loadingRoster = true;
        $scope.rosterData = Roster.query({guildId: guildId, pageNumber: pageNumber, sortType: sortType, perPage: perPage}, function (rosterData) {
          if (rosterData.roster && rosterData.roster.length > 0) {

            $scope.lastOn = LastOn.query(function(laston) {
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

          $scope.loadingRoster = false;
          $scope.completed = true;
        }, function( response ) {
          $scope.loadingRoster = false;
          $scope.completed = true;
          $scope.errorMsg = true;
        });
      };

    });
}());


