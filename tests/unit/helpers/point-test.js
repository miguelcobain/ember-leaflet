import { point } from 'dummy/helpers/point';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | point');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = point([42.12312412431231, 41.12331213212, true]);

  assert.ok(result);
  assert.ok(result instanceof L.Point);
  assert.equal(result.x, 42);
  assert.equal(result.y, 41);
});
