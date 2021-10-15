import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import locations from '../../helpers/locations';
import BaseLayerComponent from 'ember-leaflet/components/base-layer';

module('Integration | Component | base layer', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('using any layer without the createLayer implemented throws', function (assert) {
    assert.expect(1);

    this.set('center', locations.nyc);
    this.set('zoom', 13);

    assert.expectAssertion(async () => {
      await render(hbs`
        <LeafletMap @zoom={{this.zoom}} @center={{this.center}}>
          <BaseLayer/>
        </LeafletMap>
      `);
    }, /Assertion Failed: BaseLayer's `createLayer` should be overriden./);
  });

  test.skip('using any layer outside a content layer throws', function (assert) {
    assert.expect(1);

    this.owner.register(
      'component:new-base-layer',
      class NewBaseLayer extends BaseLayerComponent {
        createLayer() {}
      }
    );

    assert.expectAssertion(async () => {
      await render(hbs`<NewBaseLayer/>`);
    }, /Assertion Failed: Tried to use .* outside the context of a parent component\./);
  });
});
