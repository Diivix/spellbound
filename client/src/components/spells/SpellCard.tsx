import _ from 'lodash';
import React from 'react';
import { Card, Image } from 'semantic-ui-react';

interface IProps {
  name: string;
  level: number;
  school: string
}

class SpellCardComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public buildLevelWithSchool = (level: number, school: string, truncateValue: boolean) => {
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

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.name)), { length: 20 });
    const meta = this.buildLevelWithSchool(this.props.level, this.props.school, true);

    const cardStyle = { margin: '5px' };
    const headerStyle = { display: 'inline' };

    return (
      <Card style={cardStyle} link={true}>
        <Card.Content>
          <Image floated="left" size="mini" src={require('../../assets/alteration-64x64.png')} />
          <Card.Header style={headerStyle}>{name}</Card.Header>
          <Card.Meta textAlign="left">{meta}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default SpellCardComponent;
