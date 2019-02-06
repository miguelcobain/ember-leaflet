import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';

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
