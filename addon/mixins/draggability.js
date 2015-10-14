import Ember from 'ember';

export default Ember.Mixin.create({
  isDragging: false,

  dragstart() {
    if (this.get('onDragStart')) { this.get('onDragStart')(); }
    this.set('isDragging', true);
  },

  dragend() {
    if (this.get('onDragEnd')) { this.get('onDragEnd')(this._layer.getLatLng()) }
    /*this.setProperties({
      location: this._layer.getLatLng(),
      isDragging: false
    });*/
  }
});
