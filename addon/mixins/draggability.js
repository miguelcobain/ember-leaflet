import Ember from 'ember';
const { observer } = Ember;

export default Ember.Mixin.create({

  draggableDidChange: observer('draggable', function() {
    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })

});
