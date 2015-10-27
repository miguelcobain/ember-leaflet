import Ember from 'ember';

export default Ember.Mixin.create({
  popupOpen: false,

  _wormholeDestination: Ember.computed(function() {
    return 'popup-' + this.elementId;
  }),

  click(e) {
    this.openPopup(e);
  },

  openPopup() {
    /*let latLng = this._layer.getCenter ? this._layer.getCenter() : this._layer.getLatLng();
    this._popup
      .setLatLng((e && e.latlng) || latLng)
      .openOn(this._layer._map);*/
    this._layer.openPopup();
    this.set('popupOpen', true);
  },

  _destroyPopupContent() {
    this.set('popupOpen', false);
  },

  didCreateLayer() {
    this._popup = this.L.popup({}, this._layer);
    this._popup.setContent('<div id="' + this.get('_wormholeDestination') + '"></div>');
    const oldOnRemove = this._popup.onRemove;
    this._popup.onRemove = map => {
      this._destroyPopupContent();
      oldOnRemove.call(this._popup, map);
    };
    this._layer.bindPopup(this._popup);
  },

  willDestroyLayer() {
    // closing popup will call _destroyPopupContent
    this._layer._map.closePopup();
  }
});
