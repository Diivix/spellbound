import CharacterHeaderComponent from 'components/characters/CharacterHeader';
import CharacterMetaTableComponent from 'components/characters/CharacterMetaTable';
import CompendiumMenu from 'components/CompendiumMenu';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Menu } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { deleteCharacter, updateCharacter } from '../../actions/user/actions';
import CharacterEditablePopupComponent from '../../components/characters/CharacterEditablePopup';
import SpellCard from '../../components/spells/SpellCard';
import { ICharacter, ICharacterBase, IStoreState } from '../../models';
import { getCharacter, isBusy } from '../../selectors';

interface ICharacterComponentStateProps {
  character: ICharacter | undefined;
  isBusy: boolean;
}

interface ICharacterComponentDispatchProps {
  changeRoute: (path: string) => {};
  deleteCharacter: (characterId: string) => void;
  updateCharacter: (character: { id: string } & ICharacterBase) => {};
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
    if(isUndefined(this.props.character)) {
      return (
        <div>Character not found.</div>
      );
    }

    const spellCards = isUndefined(this.props.character.spells)
      ? null
      : this.props.character.spells.map(spell => <SpellCard key={spell._id} name={spell.name} level={spell.level} school={spell.school} />);

    return (
      <div>
        <CharacterEditablePopupComponent
          isCreate={false}
          trigger={
            <div>
              <CharacterHeaderComponent characterName={this.props.character.name} />
            </div>
          }
          characterId={this.props.character._id}
          name={this.props.character.name}
          classType={this.props.character.classType}
          level={this.props.character.level}
          description={this.props.character.description}
          update={this.props.updateCharacter}
          delete={this.props.deleteCharacter}
          isBusy={this.props.isBusy}
        />

        <CharacterMetaTableComponent
          characterClass={this.props.character.classType}
          characterLevel={this.props.character.level}
          characterDescription={this.props.character.description}
        />

        <CompendiumMenu>
          <Menu.Item disabled={true} name="Equiped Spells" position="left" icon="lightning" />
        </CompendiumMenu>

        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
          {spellCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState, props: IProps): ICharacterComponentStateProps {
  return {
    character: getCharacter(state, props.match.params.id),
    isBusy: isBusy(state)
  };
}

const mapDispatchToProps = (dispatch: any): ICharacterComponentDispatchProps => {
  return {
    changeRoute: (path: string) => dispatch(push(path)),
    deleteCharacter: (id: string) => {
      dispatch(deleteCharacter(id));
      dispatch(push('/characters'));
    },
    updateCharacter: (character: { id: string } & ICharacterBase) => dispatch(updateCharacter(character))
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
