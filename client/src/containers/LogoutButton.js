import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react'
import { authLogout } from '../actions';

class LogoutButtonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick = (showLogin) => {
        if (!showLogin) {
            this.props.authLogout();
        }

        this.props.changeRoute('login')
    }

    render() {
        let showLogin = true;
        let text = 'Login'
        if (this.props.authStatus === 'AUTHORISED') {
            showLogin = false;
            text = 'Logout';
        }

        return (
            // <Button inverted size='tiny' onClick={() => { this.onClick(showLogin) }} content={text} />

            <Menu.Item name="auth" onClick={() => { this.onClick(showLogin) }} >
                <Icon inverted name="log out" size="large" />
                {text}
            </Menu.Item>

        );
    }
}

LogoutButtonComponent.prototypes = {
    changeRoute: PropTypes.func.isRequired,
    authStatus: PropTypes.string,
    authLogout: PropTypes.func
}

const mapStateToProps = (state) => ({
    authStatus: state.authStatus,
})

const mapDispatchToProps = (dispatch) => ({
    authLogout: () => dispatch(authLogout())
})

const LogoutButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutButtonComponent);

export default LogoutButton;
