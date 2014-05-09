(function () {
  'use strict';

  angular.module('bsDaocHeraldApp')
    .directive('bsEnter', function() {
      return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
          if(event.which === 13) {
            scope.$apply(function(){
              scope.$eval(attrs.bsEnter, {'event': event});
            });

            event.preventDefault();
          }
        });
      };
    });

}());