
import _ from 'lodash';
import React from 'react';

export const BuildLevelWithSchool = (level: number, school: string, truncateValue: boolean) => {
  school = _.upperFirst(school);

  let value;
  switch (level) {
    case 0:
      value = school + ' cantrip';
      break;
    case 1:
      value = level + 'st level ' + school;
      break;
    case 2:
      value = level + 'nd level ' + school;
      break;
    case 3:
      value = level + 'rd level ' + school;
      break;
    default:
      value = level + 'th level ' + school;
      break;
  }

  return (value = truncateValue ? _.truncate(value, { length: 20 }) : value);
};

export const SetSpellIcon = (school: string, colour: string) => {
  const iconStyle = { paddingRight: '5px', color: colour };

  switch (school) {
    case 'abjuration':
      return <i className="ra ra-level-three-advanced ra-lg" style={iconStyle} />;
    case 'conjuration':
      return <i className="ra ra-blade-bite ra-lg" style={iconStyle} />;
    case 'divination':
      return <i className="ra ra-crystal-ball ra-lg" style={iconStyle} />;
    case 'enchantment':
      return <i className="ra ra-hand ra-lg" style={iconStyle} />;
    case 'evocation':
      return <i className="ra ra-lightning-bolt ra-lg" style={iconStyle} />;
    case 'illusion':
      return <i className="ra ra-burning-eye ra-lg" style={iconStyle} />;
    case 'necromancy':
      return <i className="ra ra-death-skull ra-lg" style={iconStyle} />;
    case 'transmutation':
      return <i className="ra ra-triforce ra-lg" style={iconStyle} />;
    default:
      return <i className="ra ra-dragon-breath ra-lg" style={iconStyle} />;
  }
};