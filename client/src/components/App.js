import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Icon, Menu, Segment } from 'semantic-ui-react';
import SpellCompendium from '../containers/SpellCompendium';
import LoginModal from '../containers/LoginModal';
import LogoutButton from '../containers/LogoutButton';
// import VisibleSpells from '../containers/VisibleSpells';

class App extends React.Component {
    constructor() {
        super();
        this.state = { activeItem: '' };

        this.changeRoute = this.changeRoute.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    changeRoute = (name) => {
        this.props.history.push('/' + name);
    };

    handleItemClick = (e, { name }) => {
        this.changeRoute(name);
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state;
        const menuStyle = { borderRadius: 0 }

        return (
            <div>
                <div>
                    {/* <Segment basic inverted color="violet"> */}
                    <Menu inverted icon color="violet" style={menuStyle}>
                        <Menu.Item>
                            <Icon name="book" size="large" link />
                            SpellBound
                            </Menu.Item>
                        <Menu.Item
                            name="characters"
                            active={activeItem === 'characters'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name="users" />
                        </Menu.Item>

                        <Menu.Item
                            name="spells"
                            active={activeItem === 'spells'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name="book" size="large" />
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <LogoutButton changeRoute={this.changeRoute} />
                        </Menu.Menu>
                    </Menu>
                    {/* </Segment> */}
                </div>
                <div>
                    <Segment basic>
                        {/* <SpellCompendium /> */}
                        <Switch>
                            <Route path="/login" render={() => (<LoginModal changeRoute={this.changeRoute} />)} />
                            <Route path="/spells" render={() => (<SpellCompendium changeRoute={this.changeRoute} />)} />
                            {/* <Route path="/items" component={ItemCompendium} /> */}
                            <Route path="/" render={() => (<SpellCompendium changeRoute={this.changeRoute} />)} />
                        </Switch>
                    </Segment>
                </div>
            </div>
        );
    }
}

App.proptypes = {
    store: PropTypes.object.isRequired
}

// export default withRouter(App);
export default App