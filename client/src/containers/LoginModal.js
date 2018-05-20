import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Header, Icon, Image, Input, Modal, Responsive, Grid, Transition } from 'semantic-ui-react'
import { authLogin } from '../actions';

class LoginModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', isLoading: false, hasSumnittedForm: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.authStatus === 'AUTHORISED') {
            this.props.changeRoute('spells');
        }
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        this.props.authLogin({ email: this.state.email, password: this.state.password });
        this.setState({ isLoading: true, hasSumnittedForm: true });
    };

    render() {
        let { email, password, hasSumnittedForm, isLoading } = this.state
        const formField = { marginBottom: '5px' }
        const showAuthError = (this.props.authStatus === 'UNAUTHORISED' && hasSumnittedForm) ? true : false;
        const showOtherError = (this.props.authStatus === 'ERRORED' && hasSumnittedForm) ? true : false;
        if (showAuthError || showOtherError) {
            isLoading = false;
        }

        return (
            <Modal dimmer='blurring' open={true}>
                <Modal.Content as={Grid} celled='internally' verticalAlign='middle' columns={2}>
                    <Grid.Row>
                        <Responsive as={Grid.Column} width={8} minWidth={Responsive.onlyTablet.minWidth} verticalAlign='middle'>
                            <Image src={require('../assets/frame.png')} fluid />
                        </Responsive>
                        <Grid.Column width={8}>
                            <Header color='grey'>Welcome to Spellbound</Header>

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field style={formField}>
                                    <Input icon='mail' iconPosition='left' placeholder='Email' name='email' value={email} autoComplete='email' onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Field style={formField}>
                                    <Input icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={password} autoComplete='current-password' onChange={this.handleChange} />
                                </Form.Field>

                                <Button color='violet' type='submit' loading={isLoading} content='Login' />
                            </Form>

                            <Transition animation='shake' duration={500} visible={showAuthError}>
                                <Header color='grey'><Icon size='big' color='yellow' name='exclamation triangle' />Incorrect email or password!</Header>
                            </Transition>

                            <Transition animation='shake' duration={500} visible={showOtherError}>
                                <Header color='grey'><Icon size='big' color='red' name='exclamation triangle' />Either something went wrong, or you didn't provide an email and password.</Header>
                            </Transition>
                        </Grid.Column>
                    </Grid.Row>
                </Modal.Content>
            </Modal>
        );
    }
}

LoginModal.prototypes = {
    changeRoute: PropTypes.func.isRequired,
    authStatus: PropTypes.string,
    authLogin: PropTypes.func
}

const mapStateToProps = (state) => ({
    authStatus: state.authStatus,
})

const mapDispatchToProps = (dispatch) => ({
    authLogin: (credentials) => dispatch(authLogin(credentials))
})

const LoginModal =  connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModalComponent);

export default LoginModal;
