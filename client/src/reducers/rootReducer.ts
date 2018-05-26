import { routerReducer } from 'react-router-redux';
import { combineReducers } from "redux";
import IStoreState from "../store/IStoreState";
import isAuthenticated from "./authenticationReducer";
import pendingActions from "./pendingActionsReducer";

const rootReducer = combineReducers<IStoreState>({
  isAuthenticated,
  pendingActions,
  routerReducer
});

export default rootReducer;
