import { IBreadcrumbProps } from '@blueprintjs/core';
import { addSpell, removeSpell } from 'actions/characters/actions';
import PopoverComponent from 'components/spells/Popover';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNullOrUndefined, isUndefined } from 'util';
import { deleteCharacter, updateCharacterMeta } from '../../actions/characters/actions';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import CharacterDetailsComponent from '../../components/characters/CharacterDetails';
import { ICharacter, ICharacterBase, ICharacterSimple, IStoreState } from '../../models';
import { getCharacter, getCharactersSimple, isBusy } from '../../selectors';

interface IStateProps {
  character: ICharacter | undefined;
  getCharactersLite: ICharacterSimple[] | undefined;
  isBusy: boolean;
}

interface IDispactProps {
  addSpellToCharacter: (characterId: number, spellId: number) => {};
  changeRoute: (path: string) => {};
  deleteCharacter: (characterId: number) => void;
  removeSpellFromCharacter: (characterId: number, spellId: number) => {};
  updateCharacter: (character: { id: number } & ICharacterBase) => {};
}

interface IProps extends IStateProps, IDispactProps {
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
    if (isUndefined(this.props.character)) {
      return <div>Character not found.</div>;
    }
    const { character } = this.props;
    const breadcrumbs: IBreadcrumbProps[] = [{ onClick: this.changeRoute, text: 'Characters' }, { text: _.startCase(character.name) }];
    const spellCards = isNullOrUndefined(this.props.character.spells)
      ? null
      : this.props.character.spells.map(spell => <PopoverComponent key={spell.id} spell={spell} changeRoute={this.props.changeRoute} characters={this.props.getCharactersLite} addSpellToCharacter={this.props.addSpellToCharacter} removeSpellFromCharacter={this.props.removeSpellFromCharacter} />);

    return (
      <div className="sb-container">
        <BreadcrumbsComponent items={breadcrumbs} />
        <div className="sb-character">
          <CharacterDetailsComponent
            name={character.name}
            classType={character.classType}
            level={character.level}
            description={character.description}
            updateMeta={updateCharacterMeta}
            delete={deleteCharacter}
            isBusy={this.props.isBusy}
          />

          <div className="sb-card-group">{spellCards} </div>
        </div>
      </div>
    );
  }

  private changeRoute = () => {
    this.props.changeRoute('/characters');
  };
}

function mapStateToProps(state: IStoreState, props: IProps): IStateProps {
  return {
    character: getCharacter(state, props.match.params.id),
    getCharactersLite: getCharactersSimple(state),
    isBusy: isBusy(state)
  };
}

const mapDispatchToProps = (dispatch: any): IDispactProps => {
  return {
    addSpellToCharacter: (characterId: number, spellId: number) => dispatch(addSpell(characterId, spellId)),
    changeRoute: (path: string) => dispatch(push(path)),
    deleteCharacter: (id: number) => {
      dispatch(deleteCharacter(id));
      dispatch(push('/characters'));
    },
    removeSpellFromCharacter: (characterId: number, spellId: number) => dispatch(removeSpell(characterId, spellId)),
    updateCharacter: (character: { id: number } & ICharacterBase) => dispatch(updateCharacterMeta(character))
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
