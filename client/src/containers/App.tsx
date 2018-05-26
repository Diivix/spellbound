import * as React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Icon, InputOnChangeData, Menu, Segment } from 'semantic-ui-react';
import Routes from '../routes/Routes';
import { isBusy } from '../selectors';
import IStoreState from '../store/IStoreState';

interface IAppProps {
  readonly isBusy: boolean;
  readonly isAuthenticated: boolean;
}

interface IAppState {
    activeItem: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = { activeItem: '' };

    // this.changeRoute = this.changeRoute.bind(this);
    // this.handleItemClick = this.handleItemClick.bind(this);
  }

//   public changeRoute = (name: string) => {
//     this.props.history.push('/' + name);
//   };

  public handleItemClick = (e: any, data: InputOnChangeData) => {
    // this.changeRoute(name);
    this.setState({ activeItem: data.name });
  };

  public render() {
    const { activeItem } = this.state;
    const menuStyle = { borderRadius: 0 };

    return (
      <div>
        <Menu inverted={true} icon={true} color="violet" style={menuStyle}>
            <Menu.Item>
              <Icon name="book" size="large" link={true} />
              SpellBound
            </Menu.Item>
            <Menu.Item name="characters" active={activeItem === 'characters'} onClick={this.handleItemClick}>
              <Icon name="users" />
            </Menu.Item>
            <Menu.Item name="spells" active={activeItem === 'spells'} onClick={this.handleItemClick}>
              <Icon name="book" size="large" />
            </Menu.Item>
        </Menu>
          <div>
            <Segment>
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

// export default withRouter(App);
export default connect(mapStateToProps)(App);
