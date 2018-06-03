import * as React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { push } from 'react-router-redux';
import { Icon, InputOnChangeData, Menu, Segment } from 'semantic-ui-react';
import { signOut } from '../actions/authentication/authenticationActions';
import { IStoreState } from '../models';
import Routes from '../routes/Routes';
import { isBusy } from '../selectors';

interface IAppStateProps {
  readonly isBusy: boolean;
  readonly isAuthenticated: boolean;
}

interface IAppDispatchProps {
  // tslint:disable-next-line:ban-types
  readonly changeRoute: Function;
  // tslint:disable-next-line:ban-types
  readonly signOut: Function;
}

interface IAppState {
  activeItem: string;
}

class App extends React.Component<IAppStateProps & IAppDispatchProps, IAppState> {
  constructor(props: IAppStateProps & IAppDispatchProps) {
    super(props);
    this.state = { activeItem: 'home' };
  }

  public handleItemClick = (e: any, data: InputOnChangeData) => {
    this.props.changeRoute('/' + data.name);
    this.setState({ activeItem: data.name });
  };

  public handleSiginOut = () => {
    this.props.signOut();
  };

  public render() {
    const { activeItem } = this.state;
    const menuStyle = { borderRadius: 0 };

    // TODO: get route info to set the active menu item.

    // Note, the name of the menue items must match the route paths!
    return (
      <div>
        <Menu inverted={true} icon={true} color="violet" style={menuStyle}>
          <Menu.Item>
            <Icon name="book" size="large" link={true} />
            SpellBound
          </Menu.Item>
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
            <Icon name="users" />
          </Menu.Item>
          <Menu.Item name="spells" active={activeItem === 'spells'} onClick={this.handleItemClick}>
            <Icon name="book" size="large" />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="auth" onClick={this.handleSiginOut}>
              <Icon inverted={true} name="log out" size="large" />
              {'Sign Out'}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div>
          <Segment basic={true}>
            <Switch>
              <Routes isAuthenticated={this.props.isAuthenticated} />
            </Switch>
          </Segment>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState) {
  return {
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changeRoute: (routeName: string) => dispatch(push(routeName)),
    signOut: () => dispatch(signOut())
  };
}

// export default withRouter(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);
