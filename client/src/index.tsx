import createHistory from 'history/createBrowserHistory'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router'
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
import App from './components/App.js';
// import reducer from './reducers/combinedReducers';
import registerServiceWorker from './registerServiceWorker';
import { IApplicationState } from './store';
// import { configureStore } from './store/configureStore';
import configureStore from './store/configureStore2';


// Seems to be an issue with semantic-ui-css as a downloaded project. Using semantic-ui-css CDN v2.2.12 in index.html until resolved.
// import 'semantic-ui-css/semantic.min.css';

const history = createHistory()
const appState: IApplicationState = { auth: { authStatus: "UNAUTHORISED" } }
// const store = configureStore({ authStatus: 'UNAUTHORISED' });
const store = configureStore(history, appState);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} onEnter="/login" />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
