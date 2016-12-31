import { icon } from 'dummy/helpers/icon';
import { module, test } from 'qunit';
import L from 'ember-leaflet/L';

module('Unit | Helper | icon');

test('it works', function(assert) {
  let result = icon([], {
    iconUrl: 'custom-url.png'
  });

  assert.ok(result);
  assert.ok(result instanceof L.Icon);
  assert.equal(result.options.iconUrl, 'custom-url.png');
});
