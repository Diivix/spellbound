import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import createHistory from 'history/createBrowserHistory';
import 'normalize.css/normalize.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'rpg-awesome/css/rpg-awesome.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const history = createHistory();
const store = configureStore(history);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* Persistor allows persistance between sessions */}
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Route path="/" component={App} onEnter="/login" />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
