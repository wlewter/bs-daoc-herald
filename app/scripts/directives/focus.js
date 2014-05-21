(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .directive('bsFocus', function() {
    return {
      link: function(scope, element, attrs) {
        element[0].focus();
      }
    };
  });

}());