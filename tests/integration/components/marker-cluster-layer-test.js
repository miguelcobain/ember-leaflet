import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('marker-cluster-layer', 'Integration | Component | marker cluster layer', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{marker-cluster-layer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#marker-cluster-layer}}
      template block text
    {{/marker-cluster-layer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
