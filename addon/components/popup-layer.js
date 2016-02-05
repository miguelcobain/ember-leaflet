import Ember from 'ember';
import layout from '../templates/popup';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';
import BaseLayer from 'ember-leaflet/components/base-layer';
/* global L */

/**
 * Layer to display a popup in ember-leaflet. Takes popup contents as a
 * rendering block in the template.
 *
 * Available attributes are specified below in `leafletOptions`; these will be
 * passed along to the L.popup() function in a hash and are equivalent to the
 * options with the same names in the Leaflet docs.
 *
 * Other attributes:
 *
 *   - location: an `L.LatLng` or equivalent. Is live-bound to the popup's
 *     location using `setLatLng`.
 *   - closePopup: Action, no arguments. Called when the popup should be closed.
 *     It should usually be used to change a property that controls the display
 *     of the popup in the template.
 */
export default BaseLayer.extend({

  // we need a "tagfull" here to have `this.element`
  tagName: 'div',

  layout,

  //if this layer is being displayed, popupOpen is ALWAYS true
  popupOpen: true,

  leafletOptions: [
    'maxWidth',
    'minWidth',
    'maxHeight',
    'autoPan',
    'keepInView',
    'closeButton',
    'offset',
    'autoPanPaddingTopLeft',
    'autoPanPaddingBottomRight',
    'autoPanPadding',
    'zoomAnimation',
    'closeOnClick',
    'className',
  ],

  leafletProperties: [
    'location:setLatLng'
  ],
  location: toLatLng(),

  closePopup: null,

  /*
   * Evil hack by @rwjblue.
   * `hasBlock` isn't available in js land.
   * More info: https://github.com/miguelcobain/rfcs/blob/js-has-block/text/0000-js-has-block.md#alternatives
   */
  setHasBlock: Ember.computed(function() {
    this.set('hasBlock', true);
  }),

  // creates a document fragment that will hold the DOM
  destinationElement: Ember.computed(function() {
    return document.createElement('div');
  }),

  willInsertElement() {
    this._super(...arguments);
    this._firstNode = this.element.firstChild;
    this._lastNode = this.element.lastChild;
    this.appendToDestination();
  },

  appendToDestination() {
    let destinationElement = this.get('destinationElement');
    this.appendRange(destinationElement, this._firstNode, this._lastNode);
  },

  appendRange(destinationElement, firstNode, lastNode) {
    while(firstNode) {
      destinationElement.insertBefore(firstNode, null);
      firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
    }
  },

  createLayer() {
    const layer = L.popup(this.get('options'));
    layer.setContent(this.get('destinationElement'));
    layer.setLatLng(this.get('location'));

    return layer;
  },

  didCreateLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._hijackPopup();
    }
  },

  /**
   * Traps Leaflet's close event (triggered by the popup close button and, if
   * `closeOnClick` === `true`, background clicks). Instead of closing the
   * popup, it will cause the `closePopup` action to be called, allowing you to
   * tear down the popup in your parent as per data-down, actions-up.
   */
  _hijackPopup() {
    //this function actually causes the popup to be destroyed. we'll save it for
    //later, and replace it with...
    this._leafletOnRemove = this._layer.onRemove;

    //...this function, which does nothing but call your action.
    this._layer.onRemove = () => {
      if (this.get('closePopup')) {
        this.invokeAction('closePopup');
      }
    };
  },

  willDestroyLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      //as noted above, calling this function *actually* removes the popup
      this._leafletOnRemove.call(this._layer, this._layer._map);

      delete this._firstNode;
      delete this._lastNode;
    }
  }

});
