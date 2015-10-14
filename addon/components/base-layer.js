import Ember from 'ember';
import ContainerLayer from './leaflet-map';
/* global L */

export default Ember.Component.extend({
  tagName: '',
  L,

  concatenatedProperties: ['leafletOptions', 'leafletRequiredOptions', 'leafletEvents'],

  containerLayer: Ember.computed(function() {
    return this.nearestOfType(ContainerLayer);
  }).readOnly(),

  leafletOptions: [],
  options: Ember.computed(function() {
    let leafletOptions = this.get('leafletOptions');
    let options = {};
    leafletOptions.forEach(optionName => {
      if(this.get(optionName)) {
        options[optionName] = this.get(optionName);
      }
    });
    return options;
  }),

  leafletRequiredOptions: [],
  requiredOptions: Ember.computed(function() {
    let leafletRequiredOptions = this.get('leafletRequiredOptions');
    let options = [];
    leafletRequiredOptions.forEach(optionName => {
      if(this.get(optionName)) {
        options.push(this.get(optionName));
      }
    });
    return options;
  }),

  createLayer: Ember.K,
  didCreateLayer: Ember.K,
  destroyLayer: Ember.K,

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this._layer = this.createLayer();
      this.didCreateLayer();
      this._addObservers();
      this._addEventListeners();
      if (this.get('containerLayer')) {
        this.get('containerLayer')._layer.addLayer(this._layer);
      }
    });
  },

  willDestroyElement() {
    this._removeEventListeners();
    this._removeObservers();
    this.destroyLayer();
    if (this.get('containerLayer')) {
      this.get('containerLayer')._layer.removeLayer(this._layer);
    }
    this._layer = null;
  },

  leafletEvents: [],

  _addEventListeners() {
    this._eventHandlers = {};
    this.get('leafletEvents').forEach(function(eventName) {
      if(typeof this[eventName] === 'function') {
        // create an event handler that runs the function inside an event loop.
        this._eventHandlers[eventName] = function(e) {
          Ember.run(this, this[eventName], e);
        };
        this._layer.addEventListener(eventName, this._eventHandlers[eventName], this);
      }
    }, this);
  },

  _removeEventListeners() {
    this.get('leafletEvents').forEach(function(eventName) {
      if(typeof this[eventName] === 'function') {
        this._layer.removeEventListener(eventName,
          this._eventHandlers[eventName], this);
        delete this._eventHandlers[eventName];
      }
    }, this);
  },

  leafletProperties: [],

  _addObservers() {
    this._observers = {};
    this.get('leafletProperties').forEach(function(propExp) {

      let [property, leafletProperty] = propExp.split(':');
      leafletProperty = leafletProperty ? leafletProperty : property;

      this._observers[property] = function() {
        let value = this.get(property);
        let setterName = 'set' + Ember.String.classify(leafletProperty);
        Ember.assert(this.constructor + ' must have a ' + setterName + ' function.', !!this._layer[setterName]);
        this._layer[setterName].call(this._layer, value);
      };

      this.addObserver(property, this, this._observers[property]);
    }, this);
  },

  _removeObservers() {
    this.get('leafletProperties').forEach(function(propExp) {

      let [property] = propExp.split(':');

      this.removeObserver(property, this, this._observers[property]);
      delete this._observers[property];
    }, this);
  }

});
