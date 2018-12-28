
import _ from 'lodash';
import React from 'react';

export const BuildLevel = (level: number, type: string, truncateValue: boolean) => {
  let value;
  switch (level) {
    case 0:
      value = BuildZeroLevel(level, type)
      break;
    case 1:
      value = level + 'st level ' + _.upperFirst(type);
      break;
    case 2:
      value = level + 'nd level ' + _.upperFirst(type);
      break;
    case 3:
      value = level + 'rd level ' + _.upperFirst(type);
      break;
    default:
      value = level + 'th level ' + _.upperFirst(type);
      break;
  }

  return (value = truncateValue ? _.truncate(value, { length: 20 }) : value);
};

const BuildZeroLevel = (level: number, type: string) => {
  const spellSchools = [""];

  if(_.includes(spellSchools, type)) {
    return _.upperFirst(type) + ' cantrip'
  } 

  return level + ' level ' + _.upperFirst(type);
}

export const SetSpellIcon = (school: string) => {
  const iconStyle = { paddingRight: '5px' };

  switch (school) {
    case 'abjuration':
      return <i className="ra ra-level-three-advanced ra-lg sb-colour-teal" style={iconStyle} />;
    case 'conjuration':
      return <i className="ra ra-blade-bite ra-lg sb-colour-teal" style={iconStyle} />;
    case 'divination':
      return <i className="ra ra-crystal-ball ra-lg sb-colour-teal" style={iconStyle} />;
    case 'enchantment':
      return <i className="ra ra-hand ra-lg sb-colour-teal" style={iconStyle} />;
    case 'evocation':
      return <i className="ra ra-lightning-bolt ra-lg sb-colour-teal" style={iconStyle} />;
    case 'illusion':
      return <i className="ra ra-burning-eye ra-lg sb-colour-teal" style={iconStyle} />;
    case 'necromancy':
      return <i className="ra ra-death-skull ra-lg sb-colour-teal" style={iconStyle} />;
    case 'transmutation':
      return <i className="ra ra-triforce ra-lg sb-colour-teal" style={iconStyle} />;
    default:
      return <i className="ra ra-dragon-breath ra-lg sb-colour-teal" style={iconStyle} />;
  }
};