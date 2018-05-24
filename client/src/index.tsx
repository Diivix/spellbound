import { BrowserRouter as Router, Route } from 'react-router-dom';
import { configureStore } from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import App from './components/App.js';
import React from 'react';
import ReactDOM from 'react-dom';
// import reducer from './reducers/combinedReducers';
import registerServiceWorker from './registerServiceWorker';

// Seems to be an issue with semantic-ui-css as a downloaded project. Using semantic-ui-css CDN v2.2.12 in index.html until resolved.
// import 'semantic-ui-css/semantic.min.css';

// const store = configureStore({ authStatus: 'UNAUTHORISED' });
const store = configureStore();

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

