import { IBreadcrumbProps } from '@blueprintjs/core';
import PopoverComponent from 'components/spells/Popover';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNullOrUndefined, isUndefined } from 'util';
import { deleteCharacter, updateCharacter } from '../../actions/characters/actions';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import CharacterDetailsComponent from '../../components/characters/CharacterDetails';
import { ICharacter, ICharacterBase, IStoreState } from '../../models';
import { getCharacter, isBusy } from '../../selectors';

interface IStateProps {
  character: ICharacter | undefined;
  isBusy: boolean;
}

interface IDispactProps {
  changeRoute: (path: string) => {};
  deleteCharacter: (characterId: number) => void;
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
      : this.props.character.spells.map(spell => <PopoverComponent key={spell.id} spell={spell} changeRoute={this.props.changeRoute} />);

    return (
      <div className="sb-container">
        <BreadcrumbsComponent items={breadcrumbs} />
        <div className="sb-character">
          <CharacterDetailsComponent
            name={character.name}
            classType={character.classType}
            level={character.level}
            description={character.description}
            update={updateCharacter}
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
    isBusy: isBusy(state)
  };
}

const mapDispatchToProps = (dispatch: any): IDispactProps => {
  return {
    changeRoute: (path: string) => dispatch(push(path)),
    deleteCharacter: (id: number) => {
      dispatch(deleteCharacter(id));
      dispatch(push('/characters'));
    },
    updateCharacter: (character: { id: number } & ICharacterBase) => dispatch(updateCharacter(character))
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
