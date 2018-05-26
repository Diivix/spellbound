import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import IStoreState from "./IStoreState";

const persistConfig = {
  key: 'root',
  storage
};

const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore(history: History) {
  return createStore<IStoreState>(
    persistedReducer,
    applyMiddleware(thunkMiddleware, routerMiddleware(history), loggerMiddleware)
  );
}
