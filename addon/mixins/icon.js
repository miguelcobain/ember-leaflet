import Ember from 'ember';
const { observer } = Ember;

export default Ember.Mixin.create({

  iconDidChange: observer('icon', function() {
    this._layer.setIcon(this.get('icon'));

    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })

});
