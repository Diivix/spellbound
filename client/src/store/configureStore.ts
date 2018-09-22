import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { IStoreState } from '../models';
import rootReducer from '../reducers/rootReducer';
import { initialState } from './initialState';

const persistConfig = {
  blacklist: ['pendingActions', 'spellData.currentSpell'],
  key: 'root',
  storage
};

const loggerMiddleware = createLogger();
// TODO: Fix this!
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(history: History) {
  return createStore<IStoreState>(
    persistedReducer,
    initialState,
    applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware)
  );
}
