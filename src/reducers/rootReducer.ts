import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redoodle';
import { IStoreState } from '../models';
import { authReducer } from './authActionsReducer';
import { pendingActionsReducer } from './pendingActionsReducer';
import { spellReducer } from './spellReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers<IStoreState>({
  isAuthenticated: authReducer,
  pendingActions: pendingActionsReducer,
  router: routerReducer,
  spellData: spellReducer,
  userData: userReducer
});