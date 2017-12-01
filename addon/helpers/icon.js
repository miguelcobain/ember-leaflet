import { helper } from '@ember/component/helper';
const isFastBoot = typeof FastBoot !== 'undefined';

export const icon = isFastBoot ? function() {} : function icon(_, hash) {
  return L.icon(hash);
};

export default helper(icon);
