import { computed } from '@ember/object';
import { and } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import BaseLayer from 'ember-leaflet/components/base-layer';
import layout from '../templates/div-overlay';
import { RenderBlockMixin } from 'ember-composability-tools';

export default BaseLayer.extend(RenderBlockMixin, {
  layout,

  leafletOptions: Object.freeze([
    'offset', 'className', 'pane'
  ]),

  fastboot: computed(function() {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),

  isFastBoot: and('fastboot', 'fastboot.isFastBoot'),
});
