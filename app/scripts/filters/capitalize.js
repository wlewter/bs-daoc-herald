(function () {
  'use strict';


  /**
 * Capitalize Filter
 * @Param text
 * @return string
 */
angular.module('bsDaocHeraldApp').
  filter('capitalize', function() {
    return function(input) {
      var words = input.split(' ');
      var result = [];
      words.forEach(function(word) {
          result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        });
      return result.join(' ');
    };
  });

/**
 * Usage
 *
 * var myText = "UPPERCASE";
 *
 * {{myText|capitalize}}
 * Output
 * "Uppercase"
 *
 */

}());