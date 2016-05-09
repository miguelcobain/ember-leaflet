import Ember from 'ember';
const { computed } = Ember;

export default function(latKey = 'lat', lngKey = 'lng') {
  return computed(latKey, lngKey, {
    get() {
      let [lat, lng] = [this.get(latKey), this.get(lngKey)];
      return this.L.latLng(lat, lng);
    },
    set(key, value) {
      this.setProperties({
        [latKey]: value ? value.lat : value,
        [lngKey]: value ? value.lng : value
      });
      return value;
    }
  });
}
