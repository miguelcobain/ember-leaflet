import Mixin from '@ember/object/mixin';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import layout from '../templates/div-overlayable';

export default Mixin.create(ParentMixin, ChildMixin, {
  layout
});
