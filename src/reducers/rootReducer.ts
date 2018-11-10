import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redoodle';
import { IStoreState } from '../models';
import { authReducer } from './authReducer';
import { pendingActionsReducer } from './pendingActionsReducer';
import { spellReducer } from './spellReducer';
import { tokenReducer } from './tokenReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers<IStoreState>({
  isAuthenticated: authReducer,
  pendingActions: pendingActionsReducer,
  router: routerReducer,
  spellData: spellReducer,
  token: tokenReducer,
  userData: userReducer
});