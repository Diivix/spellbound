import { routerReducer } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

// Import your state types and reducers here.
import authReducer from 'store/auth/reducer';
import { IAuthState } from 'store/auth/types';
// import spellsReducer from 'store/spells/reducer';
// import { SpellsState } from 'store/spells/types';

// The top-level state object
export interface IApplicationState {
  auth: IAuthState;
//   spells: SpellsState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const reducers: Reducer<IApplicationState> = combineReducers<IApplicationState>({
  auth: authReducer,
  router: routerReducer,
//   spells: spellsReducer
});