import Ember from 'ember';
import layout from '../templates/components/marker-cluster-layer';
import BaseLayer from 'ember-leaflet/components/base-layer';
import ContainerMixin from 'ember-leaflet/mixins/container';
/* global L */

export default Ember.Component.extend({
	layout,
	L,
	createLayer(){
		return this.L.markerClusterGroup(...this.get('requiredOptions'), this.get('options'));
	},
	didInsertElement() {
	this._super(...arguments);
	this.get('_childLayers').invoke('layerSetup');
	},
	willDestroyElement() {
	this._super(...arguments);
	this.get('_childLayers').clear();
	}
});
