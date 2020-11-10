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

  /**
   * The offset of the popup position. Useful to control the anchor of the popup when
   * opening it on some overlays. Defaults to `Point(0, 7)`.
   *
   * @argument offset
   * @type {Point}
   */

  /**
   * A custom CSS class name to assign to the popup.
   *
   * @argument className
   * @type {String}
   */

  /**
   * Map pane where the popup will be added. Defaults to `'popupPane'`.
   *
   * @argument pane
   * @type {String}
   */

  leafletOptions = [...this.leafletOptions, 'offset', 'className', 'pane'];

  destinationElement = document.createElement(this.destinationElementTag);

  @tracked shouldRender;
}
