import Ember from 'ember';
const { observer } = Ember;

export default Ember.Mixin.create({

  iconDidChange: observer('icon', function() {
    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })

});
