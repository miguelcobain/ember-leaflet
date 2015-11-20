import Ember from 'ember';
import layout from '../templates/popup';
const { computed, run, Mixin } = Ember;

export default Mixin.create({
  layout,
  popupOpen: false,

  _wormholeDestination: computed(function() {
    return `popup-${this.elementId}`;
  }),

  /*
   * Evil hack by @rwjblue.
   * `hasBlock` isn't available in js land.
   * More info: https://github.com/miguelcobain/rfcs/blob/js-has-block/text/0000-js-has-block.md#alternatives
   */
  setHasBlock: computed(function() {
    this.set('hasBlock', true);
  }),

  _popupopen() {
    //add id to popup div. wormwhole will render there.
    this._popup._contentNode.id = this.get('_wormholeDestination');
    this.set('popupOpen', true);
    //run update method to correctly position the map
    run.next(() => this._popup.update());
  },

  _popupclose() {
    this.set('popupOpen', false);
  },

  didCreateLayer() {
    if (this.get('hasBlock')) {
      this._popup = this.L.popup({}, this._layer);
      this._layer.bindPopup(this._popup);
    }
  },

  willDestroyLayer() {
    if (this.get('hasBlock')) {
      // closing popup will call _destroyPopupContent
      this._layer.closePopup();
      delete this._popup;
    }
  }
});
