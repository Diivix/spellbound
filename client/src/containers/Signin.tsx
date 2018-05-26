// import PropTypes from 'prop-types';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Input, InputOnChangeData, Responsive } from 'semantic-ui-react';
import IStoreState from 'store/IStoreState';
import { signIn } from '../actions/authentication/authenticationActions';
// import { AUTH_UPDATE } from '../actions/actionTypes';
import { ICredentials } from '../models';
import { isBusy } from '../selectors';

// Props & State
interface ILoginModalComponentStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
}

interface ILoginModalComponentDispatchProps {
  // tslint:disable-next-line:ban-types
  signin: Function;
}

interface IProps extends ILoginModalComponentStateProps, ILoginModalComponentDispatchProps {
  // tslint:disable-next-line:ban-types
  changeRoute: Function;
}

interface IState {
  email: string;
  password: string;
}

class LoginModalComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData) => {
    this.setState({ [data.name]: data.value });
  };

  public handleSubmit = () => {
    this.props.signin({
      email: this.state.email,
      password: this.state.password
    });
  };

  public render() {
    const { email, password } = this.state;
    const isLoading = this.props.isBusy;
    const formField = { marginBottom: '5px' };

    return (
      <div>
        <Grid celled="internally" verticalAlign="middle" columns={2}>
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

              {/* <Transition animation="shake" duration={500} visible={showAuthError}>
                <Header color="grey">
                  <Icon size="big" color="yellow" name="exclamation triangle" />Incorrect email or password!
                </Header>
              </Transition>

              <Transition animation="shake" duration={500} visible={showOtherError}>
                <Header color="grey">
                  <Icon size="big" color="red" name="exclamation triangle" />Either something went wrong, or you didn't provide an email and
                  password.
                </Header>
              </Transition> */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): ILoginModalComponentStateProps {
  return {
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any): ILoginModalComponentDispatchProps {
  return {
    signin: (credentials: ICredentials) => {
      dispatch(signIn(credentials));
    }
  };
}

const LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModalComponent);

export default LoginModal;
