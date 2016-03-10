/* global require */

import Ember from 'ember';

const helperDescs = {
  'div-icon':
    `<p>This helper returns a <a href="http://leafletjs.com/reference.html#divicon"><code>L.DivIcon</code></a> instance.<p>
     <p>Usefull to customize the icon of a <code>marker-layer</code>.</p>`,
  'icon':
    `<p>This helper returns a <a href="http://leafletjs.com/reference.html#icon"><code>L.Icon</code></a> instance.</p>
     <p>Usefull to customize the icon of a <code>marker-layer</code>.</p>`,
  'point':
    `<p>This helper returns a <a href="http://leafletjs.com/reference.html#point"><code>L.Point</code></a> instance.</p>`
};

export default Ember.Route.extend({
  model(params) {
    this.helperName = params.helper_name;
    this.helperDesc = helperDescs[this.helperName] || 'No description yet.';
    return require(`ember-leaflet/helpers/${params.helper_name}`).default;
  },

  setupController(controller, model) {
    controller.setProperties({
      helperName: this.helperName,
      helperDesc: this.helperDesc,
      helperFunc: model.compute.toString(),
    });
  }
});
