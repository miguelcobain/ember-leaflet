import { divIcon } from 'dummy/helpers/div-icon';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | div-icon');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = divIcon([], {
    html: '<h1>what\'s up?</h1>'
  });

  assert.ok(result);
  assert.ok(result instanceof L.DivIcon);
  assert.equal(result.options.html, '<h1>what\'s up?</h1>');
});
