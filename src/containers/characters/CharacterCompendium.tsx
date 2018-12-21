import { createCharacter, getCharacters } from 'actions/characters/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNull, isNullOrUndefined } from 'util';
import PopoverComponent from '../../components/characters/CharacterAddPopover';
import CharacterCardComponent from '../../components/characters/CharacterCard';
import { Loader } from '../../components/loader/Loader';
import { ICharacter, ICharacterBase, IStoreState } from '../../models';
import { isBusy } from '../../selectors';

interface IStateProps {
  isBusy: boolean;
  characters: ICharacter[] | null;
}

interface IDispatchProps {
  changeRoute: (path: string) => {};
  createCharacter: (character: ICharacterBase) => {};
  getCharacters: () => {};
}

class CharacterCompendiumComponent extends React.Component<IStateProps & IDispatchProps, {}> {
  constructor(props: IStateProps & IDispatchProps) {
    super(props);
  }

  public componentDidMount() {
    if (isNullOrUndefined(this.props.characters)) {
      this.props.getCharacters();
    }
  }

  public render() {
    if (this.props.isBusy || isNullOrUndefined(this.props.characters)) {
      return <Loader />;
    }

    let characterCards: JSX.Element[] = [];
    if(!isNull(this.props.characters)) {
      characterCards = this.props.characters.map(character => <CharacterCardComponent key={character.id} changeRoute={this.changeCharacterRoute} character={character} />);
    }
    characterCards.push(<PopoverComponent key='createcharacter' createCharacter={this.createCharacter}/>)

    return (
      <div className="sb-container">
        <div className="sb-wrapper">
          <div className="sb-card-group">{characterCards} </div>
        </div>
      </div>
    );
  }

  private createCharacter = (character: ICharacterBase): void => {
    this.props.createCharacter(character);
  }

  private changeCharacterRoute = (characterId: number): void => {
    this.props.changeRoute('/characters/' + characterId.toString());
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    characters: state.userData.characters,
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    changeRoute: (path: string) => dispatch(push(path)),
    createCharacter: (character: ICharacterBase) => dispatch(createCharacter(character)),
    getCharacters: () => dispatch(getCharacters())
  };
}

const CharacterCompendium = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompendiumComponent);
export default CharacterCompendium;
