import _ from 'lodash';
import * as React from 'react';
import { Header, Image } from 'semantic-ui-react';

interface IProps {
  characterName: string;
}

class CharacterHeaderComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const characterName = _.capitalize(this.props.characterName);

    return (
      <Header as="h1" icon={true} textAlign="center">
        <Image circular={true} src={require('../../assets/silhouette.png')} />
        <Header.Content>{characterName}</Header.Content>
      </Header>
    );
  }
}

export default CharacterHeaderComponent;
