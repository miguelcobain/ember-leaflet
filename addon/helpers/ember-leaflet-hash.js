import { helper } from '@ember/component/helper';

export function emberLeafletHash(_, named) {
  return Object.assign({}, named);
}

export default helper(emberLeafletHash);
