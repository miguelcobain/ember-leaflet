import BaseLayer from 'ember-leaflet/components/base-layer';
import { ParentMixin } from 'ember-composability-tools';
import layout from '../templates/marker-cluster-layer';
import { default as MarkerCluster } from 'marker-cluster';

export default BaseLayer.extend(ParentMixin, {

  layout,

  init() {
    this.leafletOptions = [
      'showCoverageOnHover', 'zoomToBoundsOnClick', 'spiderfyOnMaxZoom', 'removeOutsideVisibleBounds',
      'animate', 'animateAddingMarkers', 'disableClusteringAtZoom', 'maxClusterRadius', 'polygonOptions',
      'singleMarkerMode', 'spiderLegPolylineOptions', 'spiderfyDistanceMultiplier', 'iconCreateFunction'
    ];
    this.leafletEvents = [
      // Marker clutster events
      'clusterclick', 'clusterdblclick', 'clustermousedown', 'clustermouseover', 'clustermouseout',
      'clustercontextmenu', 'clusteradd', 'clusterremove', 'animationend', 'spiderfied', 'unspiderfied',
      // Marker events
      'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
      'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'remove', 'add',
      'popupopen', 'popupclose'
    ];
    this._super(...arguments);
  },

  createLayer() {
    return new MarkerCluster.MarkerClusterGroup(...this.get('requiredOptions'), this.get('options'));
  }
});
