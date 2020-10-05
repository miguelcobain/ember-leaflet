import Helper from '@ember/component/helper';

export default Helper.helper(function ([arg1 = '']) {
  return arg1.toLowerCase();
});
