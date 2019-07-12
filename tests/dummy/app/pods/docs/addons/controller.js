// BEGIN-SNIPPET marker-cluster.js
import Controller from '@ember/controller';

// NOTE: this example uses ember decorators and native classes
export default class MarkerClusterController extends Controller {
  lat = 40.713473;
  lng = -74.007038;
  zoom = 18;

  markers = [
    {
      title: 'TD Bank',
      description: '258 Broadway, New York, NY 10007, EUA',
      location: [40.713687, -74.007068]
    },
    {
      title: 'City Hall',
      description: 'New York, NY 10007',
      location: [40.713545, -74.006707]
    },
    {
      title: 'Chase Bank',
      description: '253 Broadway, New York, NY 10007, EUA',
      location: [40.713316, -74.007386]
    },
  ];
}
// END-SNIPPET
