import { rect } from 'dummy/helpers/rect';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | rect');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = rect([
    [[42, 41], [51, 50]],
    { color: '#00ff00', weight: 2}
  ]);


  assert.ok(result);
  assert.ok(result instanceof L.Rectangle);
  assert.equal(result.options.weight, 2);
  assert.equal(result.options.color, '#00ff00');
});
