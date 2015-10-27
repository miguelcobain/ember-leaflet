import Ember from 'ember';
const { observer } = Ember;

export default Ember.Mixin.create({
  isDragging: false,

  draggableDidChange: observer('draggable', function() {
    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  }),

  dragstart() {
    this.set('isDragging', true);
  },

  dragend() {
    this.set('isDragging', false);
  }
});
