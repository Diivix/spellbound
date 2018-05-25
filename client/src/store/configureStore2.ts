import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
import { IApplicationState, reducers } from 'store';

const loggerMiddleware = createLogger();

export default function configureStore(history: History, initialState: IApplicationState): Store<IApplicationState> {
  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore<IApplicationState>(reducers, initialState, applyMiddleware(routerMiddleware(history), loggerMiddleware));
}
// 