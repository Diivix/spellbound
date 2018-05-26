import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import IStoreState from "./IStoreState";

const loggerMiddleware = createLogger();

export default function configureStore(history: History) {
  return createStore<IStoreState>(
    rootReducer,
    applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware)
  );
}
