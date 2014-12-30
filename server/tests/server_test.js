var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    server = require('../main'),
    assert;

//assert = require('chai').assert, // TODO: use this require statement in future test modules that don't use promises

chai.use(chaiAsPromised);
assert = chai.assert;

// TODO: add tests
suite('server', function () {
  //test('#init() should eventually return a server instance', function () {
  //  assert.eventually.isNotNull(server.init());
  //});
  test('should assert something', function () {
    assert.isTrue(true);
  });
});
