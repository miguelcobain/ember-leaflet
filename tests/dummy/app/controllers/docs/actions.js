import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 45.519743,
  lng: -122.680522,
  zoom: 10,
  popupLocation: null,
  actions: {
    updateCenter(e) {
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    },

    setPopupLocation(e) {
      this.set('popupLocation', e.latlng);
    },

    resetPopupLocation() {
      this.set('popupLocation', null);
    }
  }
});
