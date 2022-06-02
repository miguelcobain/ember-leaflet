import { helper } from '@ember/component/helper';

export function emberLeafletAssignTo([object], { key, value, onChange }) {
  object[key] = value;

  // we need to send out the assigned object because ember freezes helper arguments
  onChange(object);
}

export default helper(emberLeafletAssignTo);
