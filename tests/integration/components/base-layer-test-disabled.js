import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import locations from '../../helpers/locations';
import BaseLayerComponent from 'ember-leaflet/components/base-layer';

module('Integration | Component | base layer', function(hooks) {
  setupRenderingTest(hooks);

  test('using any layer without the createLayer implemented throws', function(assert) {
    assert.expect(1);

    this.set('center', locations.nyc);
    this.set('zoom', 13);

    assert.throws(async () => {
      await render(hbs`
        {{#leaflet-map zoom=zoom center=center}}
          {{base-layer}}
        {{/leaflet-map}}`);
    }, /Assertion Failed: BaseLayer's `createLayer` should be overriden./);
  });

  test('using any layer outside a content layer throws', function(assert) {
    assert.expect(1);

    this.owner.register('component:new-base-layer', BaseLayerComponent.extend({
      createLayer() { }
    }));

    assert.throws(async () => {
      await render(hbs`{{new-base-layer}}`);
    }, /Assertion Failed: Tried to use .* outside the context of a parent component\./);
  });
});

