import { latLngBounds } from 'dummy/helpers/lat-lng-bounds';
import { module, test } from 'qunit';
/* global L */

module('Unit | Helper | lat-lng-bounds', function() {
  test('it works', function(assert) {
    let result = latLngBounds([
      [42.12312412431231, 41.12331213212],
      [44.12312412431231, 43.12331213212],
      [46.12312412431231, 45.12331213212]
    ]);

    assert.ok(result);
    assert.ok(result instanceof L.LatLngBounds);

    let southWest = result.getSouthWest();
    assert.ok(southWest instanceof L.LatLng);
    assert.equal(southWest.lat, 42.12312412431231);
    assert.equal(southWest.lng, 41.12331213212);

    let northEast = result.getNorthEast();
    assert.ok(northEast instanceof L.LatLng);
    assert.equal(northEast.lat, 46.12312412431231);
    assert.equal(northEast.lng, 45.12331213212);
  });
});
