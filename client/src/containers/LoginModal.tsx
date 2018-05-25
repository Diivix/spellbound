// import PropTypes from 'prop-types';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Icon, Image, Input, InputOnChangeData, Modal, Responsive, Transition } from 'semantic-ui-react';
import { login } from '../actions';
// import { AUTH_UPDATE } from '../actions/actionTypes';
import { IAuthState, ICredentials } from '../models/models';

// Props & State
interface ILoginModalComponentStateProps {
  authStatus: string;
}

interface ILoginModalComponentDispatchProps {
  // tslint:disable-next-line:ban-types
  login: Function;
}

interface IProps extends ILoginModalComponentStateProps, ILoginModalComponentDispatchProps {
  // tslint:disable-next-line:ban-types
  changeRoute: Function;
}

interface IState {
  email: string;
  hasSumnittedForm: boolean;
  isLoading: boolean;
  password: string;
}

class LoginModalComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      hasSumnittedForm: false,
      isLoading: false,
      password: ''
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  public componentWillReceiveProps(newProps: IProps) {
    if (newProps.authStatus === 'AUTHORISED') {
      this.props.changeRoute('spells');
    }
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData) => {
    this.setState({ [data.name]: data.value });
  };

  public handleSubmit = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({ isLoading: true, hasSumnittedForm: true });
  };

  public render() {
    const { email, password, hasSumnittedForm } = this.state;
    let { isLoading } = this.state;
    const formField = { marginBottom: '5px' };
    const showAuthError = this.props.authStatus === 'UNAUTHORISED' && hasSumnittedForm ? true : false;
    const showOtherError = this.props.authStatus === 'ERRORED' && hasSumnittedForm ? true : false;

    if (showAuthError || showOtherError) {
      isLoading = false;
    }

    return (
      <Modal dimmer="blurring" open={true}>
        <Modal.Content as={Grid} celled="internally" verticalAlign="middle" columns={2}>
          <Grid.Row>
            <Responsive as={Grid.Column} width={8} minWidth={Responsive.onlyTablet.minWidth} verticalAlign="middle">
              <Image src={require('../assets/frame.png')} fluid={true}             />
            </Responsive>
            <Grid.Column width={8}>
              <Header color="grey">Welcome to Spellbound</Header>

              <Form onSubmit={this.handleSubmit}>
                <Form.Field style={formField}>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    name="email"
                    value={email}
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field style={formField}>
                  <Input
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Button color="violet" type="submit" loading={isLoading} content="Login" />
              </Form>

              <Transition animation="shake" duration={500} visible={showAuthError}>
                <Header color="grey">
                  <Icon size="big" color="yellow" name="exclamation triangle" />Incorrect email or password!
                </Header>
              </Transition>

              <Transition animation="shake" duration={500} visible={showOtherError}>
                <Header color="grey">
                  <Icon size="big" color="red" name="exclamation triangle" />Either something went wrong, or you didn't provide an email and
                  password.
                </Header>
              </Transition>
            </Grid.Column>
          </Grid.Row>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state: IAuthState): ILoginModalComponentStateProps {
  return {
    authStatus: state.authStatus
  };
}

function mapDispatchToProps(dispatch: any): ILoginModalComponentDispatchProps {
  return {
    login: (credentials: ICredentials) => {
      dispatch(login(credentials));
    }
  };
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalComponent);

export default LoginModal;
