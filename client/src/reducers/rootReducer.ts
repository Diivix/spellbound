import { routerReducer } from 'react-router-redux';
import { combineReducers } from "redux";
import { IStoreState } from '../models';
import isAuthenticated from "./authenticationReducer";
import pendingActions from "./pendingActionsReducer";
import lightSpellsWithFilters from './spellsReducer';

const rootReducer = combineReducers<IStoreState>({
  isAuthenticated,
  lightSpellsWithFilters,
  pendingActions,
  routerReducer
});

export default rootReducer;
