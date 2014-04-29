'use strict';

describe('Service: Guildsearch', function () {

  // load the service's module
  beforeEach(module('bsDaocHeraldApp'));

  // instantiate service
  var Guildsearch;
  beforeEach(inject(function (_Guildsearch_) {
    Guildsearch = _Guildsearch_;
  }));

  it('should do something', function () {
    expect(!!Guildsearch).toBe(true);
  });

});
