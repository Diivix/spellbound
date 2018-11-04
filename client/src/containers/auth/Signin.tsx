// import PropTypes from 'prop-types';
import { Button, FormGroup, H2, InputGroup, Intent } from '@blueprintjs/core';
import { Logo } from 'components/logo/Logo';
import * as React from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { backgroundColour, primaryColour } from 'utils/ui';
import { signIn } from '../../actions/authentication/actions';
// import {Loader} from '../../components/loader/Loader';
import { ICredentials, IStoreState } from '../../models';
import { isBusy } from '../../selectors';
import './Signin.css';

// Props & State
interface IStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
}

interface IDispatchProps {
  signin: (credentials: ICredentials) => void;
}

interface IProps extends IStateProps, IDispatchProps {}

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
      <div className="signin-container">
        <div className="logo-container">
          <CssTransitionGroup
            transitionName="logo"
            transitionAppear={true}
            transitionAppearTimeout={2000}
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}
          >
            <Logo scale={1} primaryColour={primaryColour} secondaryColour={backgroundColour} />
            {/* <Loader /> */}
          </CssTransitionGroup>
        </div>
        <div className="signin-container">
          <H2>Welcome to Spellbound</H2>
          <form onClick={this.handleSubmit}>
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
              <Button icon="log-in" intent={Intent.PRIMARY} text="Login" loading={isLoading} />
            </FormGroup>
          </form>
        </div>
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
