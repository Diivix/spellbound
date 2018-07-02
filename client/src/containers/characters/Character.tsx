import CharacterHeaderComponent from 'components/characters/CharacterHeader';
import CharacterMetaTableComponent from 'components/characters/CharacterMetaTable';
import CompendiumMenu from 'components/CompendiumMenu';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Menu } from 'semantic-ui-react';
import { isUndefined } from 'util';
import CharacterEditablePopupComponent from '../../components/characters/ChacrterEditablePopup';
import SpellCard from '../../components/spells/SpellCard';
import { ICharacter, IStoreState } from '../../models';
import { getCharacter } from '../../selectors';

interface ICharacterComponentStateProps {
  character: ICharacter;
}

interface ICharacterComponentDispatchProps {
  changeRoute: (routeName: string) => {};
  deleteCharacter: (characterId: string) => {};
  updateCharacter: (characterId: string, characterName?: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => {};
}

interface IProps extends ICharacterComponentStateProps, ICharacterComponentDispatchProps {
  match: any;
}

class CharacterCompoent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (isUndefined(this.props.character)) {
      this.props.changeRoute('/Error');
    }
  }

  public render() {
    const spellCards = isUndefined(this.props.character.spells)
      ? null
      : this.props.character.spells.map(spell => <SpellCard key={spell._id} name={spell.name} level={spell.level} school={spell.school} />);

    return (
      <div>
        <CharacterEditablePopupComponent
          isCreate={false}
          trigger={<div><CharacterHeaderComponent characterName={this.props.character.name} /></div>}
          characterId={this.props.character._id}
          characterName={this.props.character.name}
          characterClass={this.props.character.class}
          characterLevel={this.props.character.level}
          characterDescription={this.props.character.description}
          edit={this.props.updateCharacter}
          delete={this.props.deleteCharacter}
        />

        <CharacterMetaTableComponent
          characterClass={this.props.character.class}
          characterLevel={this.props.character.level}
          characterDescription={this.props.character.description}
        />

        <CompendiumMenu>
          <Menu.Item disabled={true} name="Equiped Spells" position="left" icon="lightning" />
        </CompendiumMenu>
        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
          {/* TODO: if null, insert picture */}
          {spellCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState, props: IProps): ICharacterComponentStateProps {
  return {
    character: getCharacter(state, props.match.params.id)
  };
}

const mapDispatchToProps = (dispatch: any): ICharacterComponentDispatchProps => {
  return {
    changeRoute: (routeName: string) => dispatch(push(routeName)),
    // TODO: Fix me.
    deleteCharacter: (characterId: string) => dispatch(),
    updateCharacter: (characterId: string, characterName?: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => dispatch()
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
