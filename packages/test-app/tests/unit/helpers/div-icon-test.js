import { divIcon } from 'ember-leaflet/helpers/div-icon';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | div-icon', function () {
  test('it works', function (assert) {
    let result = divIcon([], {
      html: "<h1>what's up?</h1>"
    });

    assert.ok(result);
    assert.ok(result instanceof L.DivIcon);
    assert.strictEqual(result.options.html, "<h1>what's up?</h1>");
  });
});
