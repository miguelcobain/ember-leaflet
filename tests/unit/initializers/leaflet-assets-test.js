import { run } from '@ember/runloop';
import Application from '@ember/application';
import ENV from '../../../config/environment';
import { initialize } from 'dummy/initializers/leaflet-assets';
import { module, test } from 'qunit';
import Resolver from 'ember-resolver';
/* global L */

module('Unit | Initializer | leaflet assets', function (hooks) {
  hooks.beforeEach(function () {
    this.TestApplication = class TestApplication extends Application {
      modulePrefix = ENV.modulePrefix;
    };
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false, Resolver });
  });

  hooks.afterEach(function () {
    delete ENV.baseURL;
    delete ENV.rootURL;
    run(this.application, 'destroy');
  });

  test('it sets icon default imagePath to default assets path', async function (assert) {
    await this.application.boot();

    assert.notStrictEqual(typeof L.Icon.Default.imagePath, 'undefined', '`L.Icon.Default.imagePath` is not set');
    assert.equal(L.Icon.Default.imagePath, '/assets/images/');
  });

  test('it sets icon default imagePath with baseURL', async function (assert) {
    ENV.baseURL = '/path/to/base/';

    await this.application.boot();

    assert.equal(L.Icon.Default.imagePath, '/path/to/base/assets/images/');
  });

  test('it sets icon default imagePath with rootURL', async function (assert) {
    ENV.baseURL = '/path/to/base/';
    ENV.rootURL = '/path/to/root/';

    await this.application.boot();

    assert.equal(L.Icon.Default.imagePath, '/path/to/root/assets/images/');
  });

  test('it supports empty rootURL', async function (assert) {
    ENV.rootURL = '';
    await this.application.boot();
    assert.equal(L.Icon.Default.imagePath, 'assets/images/');
  });

  test("an undefined rootURL should behave the same as '' (as ember-cli does)", async function (assert) {
    await this.application.boot();
    assert.equal(L.Icon.Default.imagePath, 'assets/images/');
  });

  test("a null rootURL should behave the same as '' (as ember-cli does)", async function (assert) {
    ENV.rootURL = null;
    await this.application.boot();
    assert.equal(L.Icon.Default.imagePath, 'assets/images/');
  });
});
