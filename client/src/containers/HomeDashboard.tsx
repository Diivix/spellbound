import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Card, Loader, Menu } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { createCharacter } from '../actions/user/actions';
import { getUserData } from '../actions/user/actions';
import CharacterEditablePopupComponent from '../components/characters/CharacterEditablePopup';
import CompendiumMenu from '../components/CompendiumMenu';
import SpellCard from '../components/spells/SpellCard';
import { ICharacter, ICharacterBase, IStoreState, IUserData } from '../models';
import { isBusy } from '../selectors';
import CharacterCard from './characters/CharacterCard';

interface IUserDashboardStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
  userData: IUserData | undefined;
}

interface IUserDashboardDispatchProps {
  createCharacter: (character: ICharacter) => {};
  getUserData: () => {};
}

class HomeDashboardComponent extends React.Component<IUserDashboardStateProps & IUserDashboardDispatchProps, {}> {
  constructor(props: IUserDashboardStateProps & IUserDashboardDispatchProps) {
    super(props);
  }

  public componentDidMount() {
    if (isUndefined(this.props.userData) || _.isEmpty(this.props.userData.email)) {
      this.props.getUserData();
    }
  }

  public handleCreateCharacter = () => {
    alert('hello');
  };

  public render() {
    // Return imediately if we're busy or the filters or spell are undefined.
    if (this.props.isBusy || isUndefined(this.props.userData)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const sortedCharacters = _.sortBy(this.props.userData.characters, ['dateLastModified', 'name']);
    const characterCards = sortedCharacters.map(character => <CharacterCard key={character._id} character={character} />);
    const spellCards = this.props.userData.favouriteSpells.map(spell => (
      <SpellCard key={spell._id} name={spell.name} level={spell.level} school={spell.school} />
    ));

    const section = {
      marginBottom: '30px'
    };

    return (
      <div>
        <div style={section}>
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
              isBusy={this.props.isBusy}
            />
          </CompendiumMenu>
          <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
            {characterCards}
          </Card.Group>
        </div>
        <div style={section}>
          <CompendiumMenu>
            <Menu.Item disabled={true} name="Favourite Spells" position="left" icon="lightning" />
          </CompendiumMenu>
          <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
            {spellCards}
          </Card.Group>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): IUserDashboardStateProps {
  return {
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state),
    userData: state.userData
  };
}

function mapDispatchToProps(dispatch: any): IUserDashboardDispatchProps {
  return {
    createCharacter: (character: ICharacterBase) => dispatch(createCharacter(character)),
    getUserData: () => dispatch(getUserData())
  };
}

const HomeDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeDashboardComponent);
export default HomeDashboard;
