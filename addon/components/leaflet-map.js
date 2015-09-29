import Ember from 'ember';
import layout from '../templates/components/leaflet-map';

export default Ember.Component.extend({
  layout: layout,

  didInsertElement() {
    L.map(this.element);
  }
});
