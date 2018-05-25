import { Action } from 'redux';

// Reducer states
export interface IAuthState {
  authStatus: string;
}

// Action types
export interface IAuthUpdateAction extends Action {
  type: 'AUTH_UPDATE';
  payload: {
    authState: IAuthState;
  };
}

// Down here, we'll create a discriminated union type of all actions which will be used for our reducer.
// export type ChatActions = UsersListUpdatedAction | MessageReceivedAction;
export type AuthActions = IAuthUpdateAction;
