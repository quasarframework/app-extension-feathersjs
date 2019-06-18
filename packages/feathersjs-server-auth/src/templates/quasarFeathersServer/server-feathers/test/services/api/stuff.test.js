const assert = require('assert');
const app = require('../../../src/app');

describe('\'api/stuff\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/stuff');

    assert.ok(service, 'Registered the service');
  });
});
