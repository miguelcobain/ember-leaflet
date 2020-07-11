import { computed } from '@ember/object';

export default function(latKey = 'args.lat', lngKey = 'args.lng') {
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
