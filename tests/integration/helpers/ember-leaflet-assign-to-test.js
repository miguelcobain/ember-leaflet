import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ember-leaflet-assign-to', function(hooks) {
  setupRenderingTest(hooks);

  test('it assigns a value to an existing object', async function(assert) {
    await render(hbs`
      {{#with (hash key1="value1") as |obj|}}
        {{ember-leaflet-assign-to obj key="key2" value="value2" onChange=(action (mut merged))}}

        {{#each-in merged as |k v|}}
          <p>{{k}} {{v}}</p>
        {{/each-in}}
      {{/with}}
    `);

    assert.dom('p').exists({ count: 2 });
    assert.dom('p:nth-child(1)').hasText('key1 value1');
    assert.dom('p:nth-child(2)').hasText('key2 value2');
  });
});
