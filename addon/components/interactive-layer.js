import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  leafletOptions: Object.freeze([
    'interactive', 'bubblingMouseEvents'
  ]),

  leafletEvents: Object.freeze([
    'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout',
    'contextmenu'
  ])

});
