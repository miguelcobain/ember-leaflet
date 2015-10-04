import Ember from 'ember';
import DraggabilityMixin from '../../../mixins/draggability';
import { module, test } from 'qunit';

module('Unit | Mixin | draggability');

// Replace this with your real tests.
test('it works', function(assert) {
  var DraggabilityObject = Ember.Object.extend(DraggabilityMixin);
  var subject = DraggabilityObject.create();
  assert.ok(subject);
});
