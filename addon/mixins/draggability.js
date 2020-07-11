/* eslint-disable ember/no-new-mixins */
import { observer } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  // eslint-disable-next-line ember/no-observers
  draggableDidChange: observer('draggable', function() {
    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })
});
