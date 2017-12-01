import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import BaseLayer from 'ember-leaflet/components/base-layer';
import layout from '../templates/div-overlay';
import { RenderBlockMixin } from 'ember-composability-tools';

export default BaseLayer.extend(RenderBlockMixin, {
  layout,

  leafletOptions: [
    'offset', 'className', 'pane'
  ],

  fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  isFastBoot: computed('fastboot', function() {
    return this.get('fastboot') && this.get('fastboot.isFastBoot');
  })
});
