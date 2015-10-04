import Ember from 'ember';

export default Ember.Mixin.create({
  isDragging: false,
  isDraggable: true,

  dragstart() {
    this.set('isDragging', true);
  },

  dragend() {
    this.setProperties({
      location: this._layer.getLatLng(),
      isDragging: false
    });
  }
});
