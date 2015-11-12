import Ember from 'ember';
import ParentMixin from 'ember-leaflet/mixins/parent';
import ActionCallerMixin from 'ember-leaflet/mixins/action-caller';
const { assert, computed, Component, run } = Ember;
/* global L */

export default Component.extend(ActionCallerMixin, {
  tagName: '',
  L,

  concatenatedProperties: ['leafletOptions', 'leafletRequiredOptions', 'leafletEvents', 'leafletProperties'],

  didInsertElement() {
    this._super(...arguments);
    this.registerWithParent();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.unregisterWithParent();
  },

  containerLayer: computed(function() {
    return this.nearestOfType(ParentMixin);
  }).readOnly(),

  registerWithParent() {
    let container = this.get('containerLayer');
    assert(`Tried to use ${this} outside the context of a container layer.`, container);
    container.registerChild(this);
  },

  unregisterWithParent() {
    let container = this.get('containerLayer');
    if (container) {
      container.unregisterChild(this);
    }
  },

  createLayer() {
    assert('BaseLayer\'s `createLayer` should be overriden.');
  },

  didCreateLayer: Ember.K,
  willDestroyLayer: Ember.K,

  /*
   * Method called by parent when the layer needs to setup
   */
  layerSetup() {
    Ember.Logger.info(`Creating ${this}.`);
    this._layer = this.createLayer();
    this.didCreateLayer();
    this._addObservers();
    this._addEventListeners();
    if (this.get('containerLayer')) {
      this.get('containerLayer')._layer.addLayer(this._layer);
    }
  },

  /*
   * Method called by parent when the layer needs to teardown
   */
  layerTeardown() {
    Ember.Logger.info(`Destroying ${this}.`);
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

  leafletEvents: [],

  _addEventListeners() {
    this._eventHandlers = {};
    this.get('leafletEvents').forEach(function(eventName) {

      let actionName = 'on' + Ember.String.classify(eventName);
      // create an event handler that runs the function inside an event loop.
      this._eventHandlers[eventName] = function(e) {
        run.schedule('actions', this, function() {
          //try to invoke/send an action for this event
          this.tryToInvokeAction(actionName, e);
          //allow classes to add custom logic on events as well
          if(typeof this[eventName] === 'function') {
            Ember.run(this, this[eventName], e);
          }
        });
      };

      this._layer.addEventListener(eventName, this._eventHandlers[eventName], this);
    }, this);
  },

  _removeEventListeners() {
    this.get('leafletEvents').forEach(function(eventName) {
      this._layer.removeEventListener(eventName,
        this._eventHandlers[eventName], this);
      delete this._eventHandlers[eventName];
    }, this);
  },

  leafletProperties: [],

  _addObservers() {
    this._observers = {};
    this.get('leafletProperties').forEach(function(propExp) {

      let [property, leafletProperty] = propExp.split(':');
      if (!leafletProperty) { leafletProperty = 'set' + Ember.String.classify(property); }
      let objectProperty = property.replace(/\.\[]/, ''); //allow usage of .[] to observe array changes

      this._observers[property] = function() {
        let value = this.get(objectProperty);
        assert(this.constructor + ' must have a ' + leafletProperty + ' function.', !!this._layer[leafletProperty]);
        this._layer[leafletProperty].call(this._layer, value);
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
