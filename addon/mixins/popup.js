import Ember from 'ember';
import layout from '../templates/popup';
const { computed, run } = Ember;

export default Ember.Mixin.create({
  layout,
  popupOpen: false,

  _wormholeDestination: Ember.computed(function() {
    return `popup-${this.elementId}`;
  }),

  setHasBlock: computed(function() {
    this.set('hasBlock', true);
  }),

  popupopen() {
    Ember.Logger.info(`Creating popup on ${this}.`);
    //add id to popup div. wormwhole will render there.
    this._popup._contentNode.id = this.get('_wormholeDestination');
    this.set('popupOpen', true);
    //run update method to correctly position the map
    run.next(() => this._popup.update());
  },

  popupclose() {
    Ember.Logger.info(`Destroying popup on ${this}.`);
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
      this._layer._map.closePopup();
      delete this._popup;
    }
  }
});
