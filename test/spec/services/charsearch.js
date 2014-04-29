'use strict';

describe('Service: Charsearch', function () {

  // load the service's module
  beforeEach(module('bsDaocHeraldApp'));

  // instantiate service
  var Charsearch;
  beforeEach(inject(function (_Charsearch_) {
    Charsearch = _Charsearch_;
  }));

  it('should do something', function () {
    expect(!!Charsearch).toBe(true);
  });

});
