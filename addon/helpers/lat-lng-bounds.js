import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';

export const latLngBounds = isFastBoot ? function() {} : function(latLngs) {
  return L.latLngBounds(latLngs);
};

export default helper(latLngBounds);
