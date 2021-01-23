import { tracked } from '@glimmer/tracking';

import BaseLayer from 'ember-leaflet/components/base-layer';

/**
 * A base class for PopupLayer and TooltipLayer.
 *
 * @class DivOverlayLayer
 * @extends BaseLayer
 */
export default class DivOverlayLayer extends BaseLayer {
  destinationElementTag = 'div';

  destinationElement = document.createElement(this.destinationElementTag);

  @tracked shouldRender;

  leafletOptions = [
    ...this.leafletOptions,

    /**
     * The offset of the popup position. Useful to control the anchor of the popup when
     * opening it on some overlays. Defaults to `Point(0, 7)`.
     *
     * @argument offset
     * @type {Point}
     */
    'offset',

    /**
     * A custom CSS class name to assign to the popup.
     *
     * @argument className
     * @type {String}
     */
    'className',

    /**
     * Map pane where the overlay layer will be added.
     *
     * @argument pane
     * @type {String}
     */
    'pane'
  ];
}
