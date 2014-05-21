(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('CharacterCtrl', function ($scope, $routeParams, Character, REALM, RealmRanks, LastOn, Clusters, $location) {

      /*if( !Auth.isLoggedIn() ) {
        $location.path('/login');
        return;
      }*/

      $scope.completed = false;

      /* search stuff */
      $scope.charName = '';
      $scope.guildName = '';

      $scope.clusters = Clusters.query( function(clusters) {
        if( $routeParams.clusterId ) {
          $scope.cluster = _.find(clusters, function (cluster) {
            return cluster.cluster_name == $routeParams.clusterId;
          });
        }
      }, function( response ) {
        $scope.errorMsg = true;
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

      $scope.charData = Character.query({charId: $routeParams.charId}, function (charData) {
        $scope.realm = REALM[charData.realm];

        /* class image info */
        $scope.classStr = charData.class_name.toLowerCase();
        $scope.charLink = true;
        switch( $scope.classStr ) {
          case 'acolyte':
          case 'disciple':
          case 'elementalist':
          case 'fighter':
          case 'forester':
          case 'guardian':
          case 'mage':
          case 'magess':
          case 'magician':
          case 'mystic':
          case 'naturalist':
          case 'none':
          case 'rogue':
          case 'seer':
          case 'stalker':
          case 'viking':
            $scope.charLink = false;
            break;
          case 'armswoman':
            $scope.classStr = 'armsman';
            break;
          case 'enchantress':
            $scope.classStr = 'enchanter';
            break;
          case 'heroine':
            $scope.classStr = 'hero';
            break;
          case 'huntress':
            $scope.classStr = 'hunter';
            break;
          case 'sorceress':
            $scope.classStr = 'sorcerer';
            break;
        }
        $scope.classImg = 'images/classes/' + $scope.classStr + '.jpg';
        /* end class image info */

        if( charData.guild_info && charData.guild_info.insignia ) {
          $scope.guildShield = 'images/shields/' + charData.guild_info.insignia.insignia_color_one + '-' + charData.guild_info.insignia.insignia_color_two + '-' + charData.guild_info.insignia.insignia_pattern + '-full.png';
          if( charData.guild_info.insignia.insignia_emblem === 0 ) {
            $scope.guildEmblem = 'images/insignia/blank.gif';
          } else {
            var zeroPadding = charData.guild_info.insignia.insignia_emblem < 10 ? '00' : charData.guild_info.insignia.insignia_emblem < 100 ? '0' : '';
            $scope.guildEmblem = 'images/insignia/emblem_' + zeroPadding + charData.guild_info.insignia.insignia_emblem + '.gif';
          }
        }

        LastOn.query(function(laston) {
          $scope.laston = laston[charData.last_on_range];
        }, function( response ) {
          $scope.errorMsg = true;
        });

        RealmRanks.query({}, function (realmRanks) {
          var rankObj = _.find(realmRanks, function(realmRank) {
            return charData.realm_war_stats.current.realm_points >= realmRank.min_rp && (!realmRank.max_rp || charData.realm_war_stats.current.realm_points < realmRank.max_rp);
          });

          // if rank 0 or rank 13 no need to find levels
          if( rankObj.rank === 0 || rankObj.rank === 13) {
            $scope.realmRank = rankObj.rank + 'L0';
          }
          // otherwise find the level
          else {
            // loop through the levels
            for (var i = rankObj.levels.length; i >= 0; i--) {
              if (rankObj.levels[i] <= charData.realm_war_stats.current.realm_points) {
                // if it's rank 1 then start with level 1
                if (rankObj.minor_rank_start) {
                  i++;
                }
                $scope.realmRank = rankObj.rank + 'L' + i;

                break;
              }
            }

          }

          // if both titles are the same then just use the male title
          // otherwise use both titles
          if( rankObj.titles[charData.realm - 1 ].male === rankObj.titles[charData.realm - 1 ].female ) {
            $scope.rrTitle = rankObj.titles[charData.realm - 1 ].male;
          } else {
            $scope.rrTitle = rankObj.titles[charData.realm - 1 ].male + ' / ' + rankObj.titles[charData.realm - 1 ].female;
          }
        }, function( response ) {
          $scope.errorMsg = true;

        });

        $scope.completed = true;
      }, function( response ) {
        $scope.completed = true;
        $scope.errorMsg = true;
      });


    });
}());