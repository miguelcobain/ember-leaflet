import Ember from 'ember';
import ENV from '../../../../config/environment';
import { initialize } from '../../../../initializers/browser/leaflet-assets';
import { module, test } from 'qunit';
/* global L */

const { run, Application } = Ember;

var registry, application;

module('Unit | Initializer | leaflet assets', {
  beforeEach: function() {
    run(function() {
      application = Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  },

  afterEach: function() {
    delete ENV.baseURL;
    delete ENV.rootURL;
  }
});

test('it sets icon default imagePath to default assets path', function(assert) {
  initialize(registry, application);

  assert.ok(typeof L.Icon.Default.imagePath !== 'undefined', '`L.Icon.Default.imagePath` is not set');
  assert.equal(L.Icon.Default.imagePath, '/assets/images/');
});

test('it sets icon default imagePath with baseURL', function(assert) {
  ENV.baseURL = '/path/to/base/';
  initialize(registry, application);

  assert.equal(L.Icon.Default.imagePath, '/path/to/base/assets/images/');
});

test('it sets icon default imagePath with rootURL', function(assert) {
  ENV.baseURL = '/path/to/base/';
  ENV.rootURL = '/path/to/root/';
  initialize(registry, application);

  assert.equal(L.Icon.Default.imagePath, '/path/to/root/assets/images/');
});

test('it supports empty rootURL', function(assert) {
  ENV.rootURL = '';
  initialize(registry, application);
  assert.equal(L.Icon.Default.imagePath, 'assets/images/');
});

test('an undefined rootURL should behave the same as \'\' (as ember-cli does)', function(assert) {
  initialize(registry, application);
  assert.equal(L.Icon.Default.imagePath, 'assets/images/');
});

test('a null rootURL should behave the same as \'\' (as ember-cli does)', function(assert) {
  ENV.rootURL = null;
  initialize(registry, application);
  assert.equal(L.Icon.Default.imagePath, 'assets/images/');
});