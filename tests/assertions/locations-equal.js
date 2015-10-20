export default function locationsEqual(loc1, loc2) {
  // use this.push to add the assertion.
  // see: https://api.qunitjs.com/push/ for more information

  var msg = '', isEqual = false;
  if (!loc1) { msg = 'First location was null'; }
  else if (!loc2) { msg = 'Second location was null'; }
  else if (loc1.lat !== loc2.lat) {
    msg = 'Latitude ' + loc1.lat + ' did not match ' + loc2.lat; }
  else if (loc1.lng !== loc2.lng) {
    msg = 'Longitude ' + loc1.lng + ' did not match ' + loc2.lng; }
  else { isEqual = true; }

  this.push(isEqual, loc1, loc2, msg);
}
