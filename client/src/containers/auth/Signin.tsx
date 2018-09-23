// import PropTypes from 'prop-types';
import { Button, FormGroup, H2, InputGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Responsive } from 'semantic-ui-react';
import { signIn } from '../../actions/authentication/actions';
import { ICredentials, IStoreState } from '../../models';
import { isBusy } from '../../selectors';

// Props & State
interface IStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
}

interface IDispatchProps {
  // tslint:disable-next-line:ban-types
  signin: Function;
}

interface IProps extends IStateProps, IDispatchProps {
  // tslint:disable-next-line:ban-types
  changeRoute: Function;
}

interface IState {
  email: string;
  password: string;
}

class SigninComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  public handleChange = (event: any) => {
    // tslint:disable-next-line:no-debugger
    debugger;
    if (event.currentTarget.name === 'email') {
      this.setState({ email: event.currentTarget.value });
    } else if (event.currentTarget.name === 'password') {
      this.setState({ password: event.currentTarget.value });
    }
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
    const margin = { marginBottom: '5px' };

    return (
      <div>
        <Grid celled="internally" verticalAlign="middle" columns={2}>
          <Grid.Row>
            <Responsive as={Grid.Column} width={8} minWidth={Responsive.onlyTablet.minWidth} verticalAlign="middle">
              <Image src={require('../../assets/frame.png')} fluid={true} />
            </Responsive>
            <Grid.Column width={8}>
              <H2 style={{ color: '#A7B6C2' }}>Welcome to Spellbound</H2>

              <FormGroup>
                <InputGroup
                  id="email-input"
                  name="email"
                  style={margin}
                  large={true}
                  leftIcon="envelope"
                  placeholder="Enter your email address"
                  value={email}
                  autoComplete="email"
                  onChange={this.handleChange}
                />
                <InputGroup
                  id="password-input"
                  name="password"
                  style={margin}
                  large={true}
                  leftIcon="lock"
                  placeholder="Enter your password"
                  value={password}
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  type="password"
                />
                <Button icon="log-in" intent={Intent.PRIMARY} text="Login" onClick={this.handleSubmit} loading={isLoading} />
              </FormGroup>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    signin: (credentials: ICredentials) => dispatch(signIn(credentials))
  };
}

const Signin = connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninComponent);
export default Signin;
