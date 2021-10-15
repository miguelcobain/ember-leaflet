import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ember-leaflet-assign-to', function (hooks) {
  setupRenderingTest(hooks);

  test('it assigns a value to an existing object', async function (assert) {
    this.mergeValues = value => {
      this.merged = value;
    };

    await render(hbs`
      {{#with (ember-leaflet-hash key1="value1") as |obj|}}
        {{ember-leaflet-assign-to obj key="key2" value="value2" onChange=this.mergeValues}}
      {{/with}}
    `);

    assert.deepEqual(this.merged, { key1: 'value1', key2: 'value2' });
  });
});
