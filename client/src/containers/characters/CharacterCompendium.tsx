import CharacterEditablePopupComponent from 'components/characters/ChacrterEditablePopup';
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

interface ICharacterCompendiumDispatchProps {
  createCharacter: (characterName: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => {};
}

class CharacterCompendiumComponent extends React.Component<ICharacterCompendiumStateProps & ICharacterCompendiumDispatchProps, {}> {
  constructor(props: ICharacterCompendiumStateProps & ICharacterCompendiumDispatchProps) {
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

          <CharacterEditablePopupComponent
            isCreate={true}
            trigger={
              <div>
                <Menu.Item name="addCharacter" icon="plus" />
              </div>
            }
            create={this.props.createCharacter}
          />
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

function mapDispatchToProps(dispatch: any): ICharacterCompendiumDispatchProps {
  return {
    createCharacter: (characterName: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => dispatch()
  };
}

const CharacterCompendium = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompendiumComponent);
export default CharacterCompendium;
