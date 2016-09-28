import Ember from 'ember';
const { Mixin, observer } = Ember;

export default Mixin.create({

  draggableDidChange: observer('draggable', function() {
    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })

});
