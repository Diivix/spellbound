import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from "redoodle";
import { IStoreState } from '../models';
import isAuthenticated from "./authActionsReducer";
import pendingActions from "./pendingActionsReducer";
import { spellReducer } from './spellReducer';
// import spellData from './spellsReducer';
import userData from './userReducer';

const rootReducer = combineReducers<IStoreState>({
  isAuthenticated,
  pendingActions,
  router,
  spellData: spellReducer,
  userData
});

export default rootReducer;
