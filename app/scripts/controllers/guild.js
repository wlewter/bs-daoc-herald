(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .controller('GuildCtrl', function ($scope, $routeParams, Guild, Roster, REALM, $location) {

      $scope.completed = false;
      var searchOptions = $location.search();

      $scope.showAlliance = true;
      $scope.hasNext = true;

      $scope.sortBy = searchOptions.sortBy || 'LEVEL';
      $scope.pageNumber = searchOptions.pageNumber || 0;

      $scope.guildData = Guild.query({guildId: $routeParams.guildId, serverId: $routeParams.serverId, guildKey: $routeParams.guildKey}, function (guildData) {

        $scope.getRoster(guildData.guild_id, $routeParams.serverId, $routeParams.guildKey, $scope.pageNumber, $scope.sortBy);
      });

      $scope.sortByChange = function () {
        $scope.pageNumber = 0;
        $scope.getRoster($scope.guildData.guild_id, $routeParams.serverId, $routeParams.guildKey, $scope.pageNumber, $scope.sortBy);
      };

      $scope.nextPage = function () {
        ++$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_id, $routeParams.serverId, $routeParams.guildKey, $scope.pageNumber, $scope.sortBy);
      };

      $scope.prevPage = function () {
        --$scope.pageNumber;
        $scope.getRoster($scope.guildData.guild_id, $routeParams.serverId, $routeParams.guildKey, $scope.pageNumber, $scope.sortBy);
      };


      $scope.getRoster = function (guildId, serverId, guildKey, pageNumber, sortType) {
        $scope.rosterData = Roster.query({guildId: guildId, serverId: serverId, guildKey: guildKey, pageNumber: pageNumber, sortType: sortType}, function (rosterData) {
          if (rosterData.roster && rosterData.roster.length > 0) {
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


