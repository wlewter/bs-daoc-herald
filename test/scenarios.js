/**
 * Created by waynelewter on 4/27/14.
 */

describe('my app', function() {
  beforeEach(function() {
    browser().navigateTo('../app/index.html');
  });

  var oldCount = -1;

  it("entering character name and performing click", function() {
    element('tr').query(function($el, done) {
      oldCount = $el.children().length;
      done();
    });

    input('charName').enter('etilader');

    element('button').query(function($el, done) {
      $el.click();
      done();
    });
  });

  it('should return some elements', function() {
    expect(repeater('tr td').count()).toBe(oldCount + 1);
  });
});