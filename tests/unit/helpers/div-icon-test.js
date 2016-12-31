import { divIcon } from 'dummy/helpers/div-icon';
import { module, test } from 'qunit';
import L from 'ember-leaflet/L';

module('Unit | Helper | div-icon');

test('it works', function(assert) {
  let result = divIcon([], {
    html: '<h1>what\'s up?</h1>'
  });

  assert.ok(result);
  assert.ok(result instanceof L.DivIcon);
  assert.equal(result.options.html, '<h1>what\'s up?</h1>');
});
