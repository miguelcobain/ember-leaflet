import { icon } from 'ember-leaflet/helpers/icon';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | icon', function () {
  test('it works', function (assert) {
    let result = icon([], {
      iconUrl: 'custom-url.png'
    });

    assert.ok(result);
    assert.ok(result instanceof L.Icon);
    assert.strictEqual(result.options.iconUrl, 'custom-url.png');
  });
});
