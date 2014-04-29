'use strict';

describe('Service: roster', function () {

  // load the service's module
  beforeEach(module('bsDaocHeraldApp'));

  // instantiate service
  var Roster;
  beforeEach(inject(function (_Roster_) {
    Roster = _Roster_;
  }));

  it('should do something', function () {
    expect(!!Roster).toBe(true);
  });

});
