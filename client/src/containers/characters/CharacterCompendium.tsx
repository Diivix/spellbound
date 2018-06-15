import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Loader, Menu } from 'semantic-ui-react';
import { isNull } from 'util';
import CompendiumMenu from '../../components/CompendiumMenu';
import { ICharacter, IStoreState } from '../../models';
import { isBusy } from '../../selectors';
import CharacterCard from './CharacterCard';

interface ICharacterCompendiumStateProps {
  isBusy: boolean;
  characters: ICharacter[] | null;
}

class CharacterCompendiumComponent extends React.Component<ICharacterCompendiumStateProps, {}> {
  constructor(props: ICharacterCompendiumStateProps) {
    super(props);
  }

  public render() {
    if (this.props.isBusy || isNull(this.props.characters)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const characterCards = this.props.characters.map(character => <CharacterCard key={character._id} character={character} />);

    return (
      <div>
        <CompendiumMenu>
          <Menu.Item disabled={true} name="Characters" position="left" icon="users" />
          <Menu.Item name="addCharacter" icon="plus" />
        </CompendiumMenu>

        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
          {characterCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): ICharacterCompendiumStateProps {
  return {
    characters: isNull(state.userData) ? null : state.userData.characters,
    isBusy: isBusy(state)
  };
}

const CharacterCompendium = connect(mapStateToProps)(CharacterCompendiumComponent);
export default CharacterCompendium;
