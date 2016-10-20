import BaseLayer from 'ember-leaflet/components/base-layer';
import layout from '../templates/div-overlay';
import { RenderBlockMixin } from 'ember-composability-tools';

export default BaseLayer.extend(RenderBlockMixin, {
  layout,

  leafletOptions: [
    'offset', 'className', 'pane'
  ]
});
