import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redoodle';
import { IStoreState } from '../models';
import { authReducer } from './authActionsReducer';
import pendingActions from './pendingActionsReducer';
import { spellReducer } from './spellReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers<IStoreState>({
  isAuthenticated: authReducer,
  pendingActions,
  router,
  spellData: spellReducer,
  userData: userReducer
});

export default rootReducer;
