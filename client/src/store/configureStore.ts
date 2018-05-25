// import { IAuthState } from 'models/models';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
// import reducer from '../reducers/combinedReducers';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function configureStore() {
  // const defaultState: IAuthState = { status: "UNAUTHORISED" };
  const store = createStore(persistedReducer, { authStatus: 'UNAUTHORISED' }, applyMiddleware(thunkMiddleware, loggerMiddleware));

  return store;
}
