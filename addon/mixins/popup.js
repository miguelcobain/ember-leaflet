import Ember from 'ember';
import layout from '../templates/popup';
const { computed, observer, Mixin, run } = Ember;

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

  isOpen() {
    // leaflet 1 added an `isOpen` method
    return this._popup.isOpen ? this._popup.isOpen() : this._popup._isOpen;
  },

  popupOpenDidChange: observer('popupOpen', function() {
    if (this.get('popupOpen')) {
      if (!this.isOpen()) { this._layer.openPopup(); }
    } else {
      if (this.isOpen()) { this._layer.closePopup(); }
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
      this._popup = this.L.popup(this.get('popupOptions'), this._layer);
      this._popup.setContent(this.get('destinationElement'));
      this._layer.bindPopup(this._popup);

      this._addPopupListeners();

      this.popupOpenDidChange();
    }
  },

  willDestroyLayer() {
    this._super(...arguments);
    if (this.get('hasBlock')) {
      this._layer.closePopup();
      this._layer.unbindPopup();
      this._removePopupListeners();
      delete this._popup;
      delete this._firstNode;
      delete this._lastNode;
    }
  },

  _onLayerRemove({layer}) {
    if (layer === this._popup) {
      if (this._layer._map._fadeAnimated) {
        run.later(() => {
          this.set('popupOpen', false);
        }, 200);
      } else {
        this.set('popupOpen', false);
      }
    }
  },

  _addPopupListeners() {
    // we need to hijack the `onAdd` method because we need to
    // render the template *before* the popup is opened.
    // This way, the popup will set its dimensions according to the rendered DOM.
    let oldOnAdd = this._popup.onAdd;
    this._popup.onAdd = (map) => {
      this.set('popupOpen', true);
      run.schedule('render', () => {
        oldOnAdd.call(this._popup, map);
      });
    };
    // we need to user `layerremove` event becase it's the only one that fires
    // *after* the popup was completely removed from the map
    this._layer._map.addEventListener('layerremove', this._onLayerRemove, this);
  },

  _removePopupListeners() {
    this._layer._map.removeEventListener('layerremove', this._onLayerRemove, this);
  }

});
