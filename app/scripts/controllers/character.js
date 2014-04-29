(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('CharacterCtrl', function ($scope, $routeParams, Character, REALM, RealmRanks) {

      $scope.completed = false;

      $scope.charData = Character.query({charId: $routeParams.charId, clusterId: $routeParams.clusterId, serverId: $routeParams.serverId}, function (charData) {
        $scope.realm = REALM[charData.realm];

        RealmRanks.query({}, function (realmRanks) {
          var rankObj = _.find(realmRanks, function(realmRank) {
            return charData.realm_war_overall.realm_points >= realmRank.min_rp && (!realmRank.max_rp || charData.realm_war_overall.realm_points < realmRank.max_rp);
          });

          // if rank 0 or rank 13 no need to find levels
          if( rankObj.rank === 0 || rankObj.rank === 13) {
            $scope.realmRank = rankObj.rank + 'L0';
          }
          // otherwise find the level
          else {
            // loop through the levels
            for (var i = rankObj.levels.length; i >= 0; i--) {
              if (rankObj.levels[i] <= charData.realm_war_overall.realm_points) {
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

        });

        $scope.completed = true;
      });


    });
}());