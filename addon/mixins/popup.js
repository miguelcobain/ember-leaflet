import Ember from 'ember';
import layout from '../templates/popup';
const { computed, observer, Mixin, run: { schedule } } = Ember;

export default Mixin.create({

  // we need a "tagfull" here to have `this.element`
  tagName: 'div',

  layout,
  popupOpen: false,

  closePopup() {
    this._popup._close();
  },

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

  popupOpenDidChange: observer('popupOpen', function() {
    if (this.get('popupOpen')) {
      if (!this._popup._isOpen) { this._layer.openPopup(); }
    } else {
      if (this._popup._isOpen) { this._layer.closePopup(); }
    }
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

  didCreateLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._popup = this.L.popup({}, this._layer);
      this._popup.setContent(this.get('destinationElement'));
      this._layer.bindPopup(this._popup, this.get('popupOptions'));

      this._hijackPopup();

      this.popupOpenDidChange();
    }
  },

  _hijackPopup() {
    let oldOnAdd = this._popup.onAdd;
    this._popup.onAdd = (map) => {
      this.set('popupOpen', true);
      schedule('render', () => {
        oldOnAdd.call(this._popup, map);
      });
    };

    let oldOnRemove = this._popup.onRemove;
    this._popup.onRemove = (map) => {
      oldOnRemove.call(this._popup, map);
      this.set('popupOpen', false);
    };
  },

  willDestroyLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._layer.closePopup();
      this._layer.unbindPopup();
      delete this._popup;
      delete this._firstNode;
      delete this._lastNode;
    }
  }
});
