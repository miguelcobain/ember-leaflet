import Ember from 'ember';
import layout from '../templates/popup';
const { computed, observer, Mixin } = Ember;

export default Mixin.create({

  // we need "tagfull" here to have `this.element`
  tagName: 'div',

  layout,
  popupOpen: false,

  /*
   * Evil hack by @rwjblue.
   * `hasBlock` isn't available in js land.
   * More info: https://github.com/miguelcobain/rfcs/blob/js-has-block/text/0000-js-has-block.md#alternatives
   */
  setHasBlock: computed(function() {
    this.set('hasBlock', true);
  }),

  // creates a document fragment that will hold the DOM
  destinationElement: computed(function() {
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

  appendRange: function(destinationElement, firstNode, lastNode) {
    while(firstNode) {
      destinationElement.insertBefore(firstNode, null);
      firstNode = firstNode !== lastNode ? lastNode.parentNode.firstChild : null;
    }
  },

  popupOpenDidChange: observer('popupOpen', function() {
    if (this.get('popupOpen')) {
      this._layer.openPopup();
    } else {
      this._layer.closePopup();
    }
  }),

  didCreateLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._popup = this.L.popup({}, this._layer);
      this._popup.setContent(this.get('destinationElement'));
      this._layer.bindPopup(this._popup);

      this.popupOpenDidChange();
    }
  },

  willDestroyLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._layer.unbindPopup();
      delete this._popup;
    }
  }
});
