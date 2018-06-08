import _ from 'lodash';
import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
import { ICharacter } from '../../models';

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
    // const cardStyle = { margin: '5px' };

    return (
      <Card>
        <Header as="h1" icon={true} textAlign="center">
          <Image src={require('../../assets/silhouette.png')} circular={true} />
          <Header.Content>{name}</Header.Content>
        </Header>
      </Card>
    );
  }
}

export default CharacterCardComponet;
