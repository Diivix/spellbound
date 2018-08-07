import _ from 'lodash';
import React from 'react';
import { Card } from 'semantic-ui-react';
import '../../../node_modules/rpg-awesome/css/rpg-awesome.min.css';

interface IProps {
  name: string;
  level: number;
  school: string;
}

class SpellCardComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.name)), { length: 20 });
    const meta = this.buildLevelWithSchool(this.props.level, this.props.school, true);

    const cardStyle = { margin: '5px' };
    const headerStyle = { display: 'inline' };

    return (
      <Card style={cardStyle} link={true}>
        <Card.Content>
          {/* <Image floated="left" size="mini" src={require('../../assets/alteration-64x64.png')} /> */}
          {this.setIcon(this.props.school)}
          <Card.Header style={headerStyle}>{name}</Card.Header>
          <Card.Meta textAlign="left">{meta}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }

  private buildLevelWithSchool = (level: number, school: string, truncateValue: boolean) => {
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

  private setIcon = (school: string) => {
    const iconStyle = { paddingRight: '5px' };
    let icon = <i className="ra ra-dragon-breath" style={iconStyle} />;

    switch (school) {
      case 'abjuration':
        icon = <i className="ra ra-level-three-advanced" style={iconStyle} />;
        break;
      case 'conjuration':
        icon = <i className="ra ra-blade-bite" style={iconStyle} />;
        break;
      case 'divination':
        icon = <i className="ra ra-crystal-ball" style={iconStyle} />;
        break;
      case 'enchantment':
        icon = <i className="ra ra-hand" style={iconStyle} />;
        break;
      case 'evocation':
        icon = <i className="ra ra-lightning-trio" style={iconStyle} />;
        break;
      case 'illusion':
        icon = <i className="ra ra-burning-eye" style={iconStyle} />;
        break;
      case 'necromancy':
        icon = <i className="ra ra-death-skull" style={iconStyle} />;
        break;
      case 'transmutation':
        icon = <i className="ra ra-doubled" style={iconStyle} />;
        break;
      default:
        icon = <i className="ra ra-dragon-breath" style={iconStyle} />;
        break;
    }

    return icon;
  };
}

export default SpellCardComponent;
