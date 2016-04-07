import Ember from 'ember';
import ChildMixin from 'ember-leaflet/mixins/child';
import { InvokeActionMixin } from 'ember-invoke-action';
const { assert, computed, Component, run } = Ember;
/* global L */

export default Component.extend(ChildMixin, InvokeActionMixin, {
  tagName: '',
  L,

  concatenatedProperties: ['leafletOptions', 'leafletRequiredOptions', 'leafletEvents', 'leafletProperties'],

  createLayer() {
    assert('BaseLayer\'s `createLayer` should be overriden.');
  },

  didCreateLayer: Ember.K,
  willDestroyLayer: Ember.K,

  /*
   * Method called by parent when the layer needs to setup
   */
  layerSetup() {
    this._layer = this.createLayer();
    this._addObservers();
    this._addEventListeners();
    if (this.get('containerLayer')) {
      this.get('containerLayer')._layer.addLayer(this._layer);
    }
    this.didCreateLayer();
  },

  /*
   * Method called by parent when the layer needs to teardown
   */
  layerTeardown() {
    this.willDestroyLayer();
    this._removeEventListeners();
    this._removeObservers();
    if (this.get('containerLayer') && this._layer) {
      this.get('containerLayer')._layer.removeLayer(this._layer);
    }
    this._layer = null;
  },

  leafletOptions: [],
  options: computed(function() {
    let leafletOptions = this.get('leafletOptions');
    let options = {};
    leafletOptions.forEach(optionName => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });
    return options;
  }),

  leafletRequiredOptions: [],
  requiredOptions: computed(function() {
    let leafletRequiredOptions = this.get('leafletRequiredOptions');
    let options = [];
    leafletRequiredOptions.forEach(optionName => {
      assert(`\`${optionName}\` is a required option but its value was \`${this.get(optionName)}\``, this.get(optionName));
      options.push(this.get(optionName));
    });
    return options;
  }),

  leafletEvents: Ember.A(),
  usedLeafletEvents: computed('leafletEvents', function() {
    return this.get('leafletEvents').filter(eventName => {
      let methodName = '_' + eventName;
      let actionName = 'on' + Ember.String.classify(eventName);
      return this.get(methodName) !== undefined || this.get(actionName) !== undefined;
    });
  }),

  _addEventListeners() {
    this._eventHandlers = {};
    this.get('usedLeafletEvents').forEach(eventName => {

      let actionName = 'on' + Ember.String.classify(eventName);
      let methodName = '_' + eventName;
      // create an event handler that runs the function inside an event loop.
      this._eventHandlers[eventName] = function(e) {
        run.schedule('actions', this, function() {
          //try to invoke/send an action for this event
          this.invokeAction(actionName, e);
          //allow classes to add custom logic on events as well
          if(typeof this[methodName] === 'function') {
            Ember.run(this, this[methodName], e);
          }
        });
      };

      this._layer.addEventListener(eventName, this._eventHandlers[eventName], this);
    });
  },

  _removeEventListeners() {
    if (this._eventHandlers) {
      this.get('usedLeafletEvents').forEach(eventName => {
        this._layer.removeEventListener(eventName,
          this._eventHandlers[eventName], this);
        delete this._eventHandlers[eventName];
      });
    }
  },

  leafletProperties: [],

  _addObservers() {
    this._observers = {};
    this.get('leafletProperties').forEach(propExp => {

      let [property, leafletProperty] = propExp.split(':');
      if (!leafletProperty) { leafletProperty = 'set' + Ember.String.classify(property); }
      let objectProperty = property.replace(/\.\[]/, ''); //allow usage of .[] to observe array changes

      this._observers[property] = function() {
        let value = this.get(objectProperty);
        assert(this.constructor + ' must have a ' + leafletProperty + ' function.', !!this._layer[leafletProperty]);
        this._layer[leafletProperty].call(this._layer, value);
      };

      this.addObserver(property, this, this._observers[property]);
    });
  },

  _removeObservers() {
    if (this._observers) {
      this.get('leafletProperties').forEach(propExp => {

        let [property] = propExp.split(':');

        this.removeObserver(property, this, this._observers[property]);
        delete this._observers[property];
      });
    }
  }

});
