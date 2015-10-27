import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('base-layer', 'Integration | Component | base layer', {
  integration: true
});

test('using any layer outside a content layer throws', function(assert) {
  assert.expect(1);

  assert.throws(() => {
    this.render(hbs`{{base-layer}}`);
  }, /Assertion Failed: Tried to use .* outside the context of a container layer\./);
});