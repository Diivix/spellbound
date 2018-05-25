import { Reducer } from 'redux';
import { AuthActions, IAuthState } from './types';

export const initialState: IAuthState = {
  authStatus: 'UNAUTHORISED'
};

const reducer: Reducer<IAuthState> = (state: IAuthState = initialState, action) => {
  switch ((action as AuthActions).type) {
    case 'AUTH_UPDATE':
      return { ...state, authStatus: action.authStatus };
    default:
      return state;
  }
};

export default reducer;
