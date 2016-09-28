import Ember from 'ember';
import BaseLayer from 'ember-leaflet/components/base-layer';
import layout from '../templates/div-overlay';

const { computed } = Ember;

export default BaseLayer.extend({
  layout,

  leafletOptions: [
    'offset', 'className', 'pane'
  ],

  // creates a document fragment that will hold the DOM
  destinationElement: computed(function() {
    return document.createElement('div');
  })
});
