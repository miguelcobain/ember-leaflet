import { icon } from 'dummy/helpers/icon';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | icon');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = icon([], {
    iconUrl: 'custom-url.png'
  });

  assert.ok(result);
  assert.ok(result instanceof L.Icon);
  assert.equal(result.options.iconUrl, 'custom-url.png');
});
