import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import * as React from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authentication/actions';
import { ICredentials, IStoreState } from '../../models';
import { isBusy } from '../../selectors';

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
      <div className="sb-grid sb-center-v sb-center-h sb-center-v sb-celled-internally" style={{ height: '100vh' }}>
        <div className="sb-row sb-center-v">
          <div className="sb-col sb-center-text">
            <CssTransitionGroup
              transitionName="sb-signin-image"
              transitionAppear={true}
              transitionAppearTimeout={2000}
              transitionEnterTimeout={2000}
              transitionLeaveTimeout={2000}
            >
              <div className="sb-grid sb-center-h sb-center-v" style={{ marginTop: '5%' }}>
                <div className="sb-row">
                  <div className="sb-col">
                    <i style={{ color: '#f21e1a' }} className="ra ra-fire-symbol ra-5x sb-icon sb-icon--circle" />
                  </div>
                </div>
                <div className="sb-row">
                  <div className="sb-col">
                    <i style={{ color: '#fcf41b' }} className="ra ra-lightning-bolt ra-5x sb-icon sb-icon--circle" />
                  </div>
                </div>
                <div className="sb-row">
                  <div className="sb-col">
                    <i style={{ color: '#24ccd8' }} className="ra ra-snowflake ra-5x sb-icon sb-icon--circle" />
                  </div>
                </div>
              </div>
            </CssTransitionGroup>
          </div>
          <div className="sb-col">
            <h1 className="sb-padding-top-0">Welcome to Spellbound</h1>
            <div className="sb-form" style={{ maxWidth: '350px' }}>
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
              </FormGroup>
              <FormGroup>
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
              </FormGroup>
              <Button icon="log-in" intent={Intent.PRIMARY} text="Login" loading={isLoading} onClick={this.handleSubmit} />
            </div>
          </div>
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
