import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import lines from '../../helpers/large-geometries';
/* global L */

module('Integration | Performance | ember-leaflet', function (hooks) {
  setupRenderingTest(hooks);

  /**
   * on ember-leaflet 4.0.2, leaflet 1.6.0, ember 3.14 this took
   *   - test env 2205.28000000013 ms
   *   - production env 1887.1699999999691 ms
   *
   * glimmer
   *   - test env 1500.119999999697 ms
   *   - production env 1426.5750000004118 ms
   */
  test('render a large number of polylines', async function (assert) {
    this.lines = lines;
    this.bounds = [
      [41.1449395467859, -8.539622426033022],
      [41.141097715815484, -8.529322743415834]
    ];

    let startTime = performance.now();

    await render(hbs`
      <LeafletMap @bounds={{this.bounds}} as |layers|>
        <layers.tile @url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>

        {{#each this.lines as |line|}}
          <layers.polyline @locations={{line.location.coordinates}} @color="blue" @weight={{4}} @opacity={{0.8}} as |polyline|>
            <polyline.popup>
              {{line.code}}
            </polyline.popup>
          </layers.polyline>
        {{/each}}
      </LeafletMap>
    `);

    let endTime = performance.now();
    let totalTime = endTime - startTime;
    console.log(`Rendering took ${totalTime} ms`);
    assert.ok(true);
  });

  /**
   * on leaflet 1.6.0 this took
   *   - 33.919999999852735 ms
   *
   * on leaflet 1.7.1 this took:
   *   - test env 25.92999999978929 ms
   *   - prod 29.089999999996508 ms
   */
  test('render a large number of polylines (raw leaflet)', async function (assert) {
    this.lines = lines;
    this.bounds = [
      [41.1449395467859, -8.539622426033022],
      [41.141097715815484, -8.529322743415834]
    ];

    let startTime = performance.now();

    let map = L.map(this.element).fitBounds(this.bounds);

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    ).addTo(map);

    for (let line of this.lines) {
      L.polyline(line.location.coordinates, {
        color: 'blue',
        weight: 4,
        opacity: 0.8
      })
        .bindPopup(line.code)
        .addTo(map);
    }

    let endTime = performance.now();
    let totalTime = endTime - startTime;
    console.log(`Rendering took ${totalTime} ms`);
    assert.ok(true);
  });
});
