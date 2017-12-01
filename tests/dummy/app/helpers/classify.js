import Helper from '@ember/component/helper';
import { classify } from '@ember/string';

export default Helper.helper(function([arg1 = '']) {
  return classify(arg1);
});
