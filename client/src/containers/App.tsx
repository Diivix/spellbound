import NavbarComponent from 'components/Navbar';
import * as React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { push } from 'react-router-redux';
import { signOut } from '../actions/authentication/actions';
import { IStoreState } from '../models';
import Routes from '../routes/Routes';
import { isBusy } from '../selectors';
import './App.css';

interface IStateProps {
  readonly isBusy: boolean;
  readonly isAuthenticated: boolean;
}

interface IDispatchProps {
  readonly changeRoute: (routeName: string) => void;
  readonly signOut: () => void;
}

interface IState {
  activeItem: string;
}

class AppComponent extends React.Component<IStateProps & IDispatchProps, IState> {
  constructor(props: IStateProps & IDispatchProps) {
    super(props);
    this.state = { activeItem: 'spells' };
  }

  public handleItemClick = (event: any) => {
    this.props.changeRoute('/' + event.currentTarget.name);
    this.setState({ activeItem: event.currentTarget.name });
  };

  public handleSignOut = () => {
    this.props.signOut();
  };

  public render() {
    // TODO: get route info to set the active menu item.
    // Note, the name of the menue items must match the route paths!
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated && (
          <NavbarComponent activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} handleSignOut={this.handleSignOut} />
        )}
        <div className="content">
          <Switch>
            <Routes isAuthenticated={isAuthenticated} />
          </Switch>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
