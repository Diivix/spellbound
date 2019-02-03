import { Card, IBreadcrumbProps, Icon, Intent } from '@blueprintjs/core';
import { createCharacter, getCharacters } from 'actions/characters/actions';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNull, isNullOrUndefined } from 'util';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import CharacterCardComponent from '../../components/characters/CharacterCard';
import PopoverComponent from '../../components/characters/CharacterPopover';
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
    if (isNull(this.props.characters)) {
      this.props.getCharacters();
    }
  }

  public render() {
    if (this.props.isBusy || isNullOrUndefined(this.props.characters)) {
      return <Loader />;
    }

    const breadcrumbs: IBreadcrumbProps[] = [{ text: 'Characters' }];
    let characterCards: JSX.Element[] = [];
    if (!isNull(this.props.characters)) {
      characterCards = this.props.characters.map(character => (
        <CharacterCardComponent key={character.id} changeRoute={this.changeRoute} character={character} />
      ));
    }
    characterCards.push(
      <PopoverComponent key="createcharacter" isCreate={true} createOrUpdate={this.createOrUpdateCharacter}>
        <Card className="sb-card sb-card-add sb-center-text" interactive={true}>
          <Icon icon="add" iconSize={Icon.SIZE_LARGE} intent={Intent.PRIMARY} />
        </Card>
      </PopoverComponent>
    );

    return (
      <div className="sb-container">
        <BreadcrumbsComponent items={breadcrumbs} />
        <div className="sb-wrapper">
          <div className="sb-card-group">{characterCards} </div>
        </div>
      </div>
    );
  }

  private createOrUpdateCharacter = (character: ICharacterBase): void => {
    this.props.createCharacter(character);
  };

  private changeRoute = (characterId: number): void => {
    this.props.changeRoute('/characters/' + characterId);
  };
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
