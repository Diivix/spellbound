import _ from 'lodash';
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ICharacter } from '../models';

interface IProps {
  character: ICharacter;
}

class CharacterCardComponet extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
  }

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.character.name)), { length: 20 });
    const cardStyle = { margin: '5px' };

    return (
      <Card style={cardStyle}>
        <Image src={require('../assets/dragonborn.jpg')} />

        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta><Icon name="clock" />{this.props.character.dateCreated}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default CharacterCardComponet;
