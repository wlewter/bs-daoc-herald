'use strict';

describe('Service: Guild', function () {

  // load the service's module
  beforeEach(module('bsDaocHeraldApp'));

  // instantiate service
  var Guild;
  beforeEach(inject(function (_Guild_) {
    Guild = _Guild_;
  }));

  it('should do something', function () {
    expect(!!Guild).toBe(true);
  });

});
