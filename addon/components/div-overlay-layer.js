import { tracked } from '@glimmer/tracking';

import BaseLayer from 'ember-leaflet/components/base-layer';

export default class DivOverlayLayer extends BaseLayer {
  destinationElementTag = 'div';

  leafletOptions = [...this.leafletOptions, 'offset', 'className', 'pane'];

  destinationElement = document.createElement(this.destinationElementTag);

  @tracked shouldRender;
}
