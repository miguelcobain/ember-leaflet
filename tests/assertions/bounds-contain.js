import L from 'ember-leaflet/L';

export default function boundsContain(bounds1, bounds2, msg = 'Bounds 1 doesn\'t contain bounds 2') {
  // use this.push to add the assertion.
  // see: https://api.qunitjs.com/push/ for more information

  bounds1 = L.latLngBounds(bounds1);
  bounds2 = L.latLngBounds(bounds2);

  this.push(bounds1.contains(bounds2), bounds1, bounds2, msg);
}
