import Ember from 'ember';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import layout from '../templates/div-overlayable';

const { Mixin } = Ember;

export default Mixin.create(ParentMixin, ChildMixin, {
  layout
});
