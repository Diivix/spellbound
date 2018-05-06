import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// Seems to be an issue with semantic-ui-css as a downloaded project. Using semantic-ui-css CDN v2.2.12 in index.html until resolved.
// import 'semantic-ui-css/semantic.min.css';

import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore'

const store = configureStore({ authStatus: 'UNAUTHORISED' });
const persistor = persistStore(store);

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route path="/" component={App} onEnter='/login' />
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();

