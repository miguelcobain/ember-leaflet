import { helper } from '@ember/component/helper';

export function emberLeafletOr(params) {
  return params.reduce((previous, current) => previous || current, undefined);
}

export default helper(emberLeafletOr);
