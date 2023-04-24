import BaseLayer from './base-layer';
import PopupLayer from './popup-layer';
import TooltipLayer from './tooltip-layer';

/**
 * Some Layers can be made interactive - when the user interacts with such a layer,
 * mouse events like click and mouseover can be handled. Use the event handling methods
 * to handle these events.
 *
 * @class InteractiveLayer
 * @extends BaseLayer
 */
export default class InteractiveLayer extends BaseLayer {
  leafletOptions = [
    ...this.leafletOptions,

    /**
     * If `false`, the layer will not emit mouse events and will act as a part of the underlying map.
     * Defaults to `true`.
     *
     * @argument interactive
     * @type {Boolean}
     */
    'interactive',

    /**
     * When true, a mouse event on this layer will trigger the same event on the map.
     * Defaults to `true`.
     *
     * @argument bubblingMouseEvents
     * @type {Boolean}
     */
    'bubblingMouseEvents'
  ];

  leafletEvents = [
    ...this.leafletEvents,

    /**
     * Fired when the user clicks (or taps) the layer.
     *
     * @argument onClick
     * @type {Function}
     */
    'click',

    /**
     * Fired when the user double-clicks (or double-taps) the layer.
     *
     * @argument onDblclick
     * @type {Function}
     */
    'dblclick',

    /**
     * Fired when the user pushes the mouse button on the layer.
     *
     * @argument onMousedown
     * @type {Function}
     */
    'mousedown',

    /**
     * Fired when the user releases the mouse button pushed on the layer.
     *
     * @argument onMouseup
     * @type {Function}
     */
    'mouseup',

    /**
     * Fired when the mouse enters the layer.
     *
     * @argument onMouseover
     * @type {Function}
     */
    'mouseover',

    /**
     * Fired when the mouse leaves the layer.
     *
     * @argument onMouseout
     * @type {Function}
     */
    'mouseout',

    /**
     * Fired when the user right-clicks on the layer, prevents default browser context menu
     * from showing if there are listeners on this event. Also fired on mobile when the user
     * holds a single touch for a second (also called long press).
     *
     * @argument onContextmenu
     * @type {Function}
     */
    'contextmenu'
  ];

  componentsToYield = [
    ...this.componentsToYield,
    { name: 'popup-layer', as: 'popup', component: PopupLayer },
    { name: 'tooltip-layer', as: 'tooltip', component: TooltipLayer }
  ];
}
