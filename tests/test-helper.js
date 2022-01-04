import Application from 'dummy/app';
import config from 'dummy/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import locationsEqual from './assertions/locations-equal';
import boundsContain from './assertions/bounds-contain';

setApplication(Application.create(config.APP));

QUnit.assert.locationsEqual = locationsEqual;
QUnit.assert.boundsContain = boundsContain;

setup(QUnit.assert);

start();
