import { IAuthState } from '../models/models';

export function authStatus(state: IAuthState = { authStatus: 'UNAUTHORISED' }, action: any) {
  switch (action) {
    case 'AUTH_STATUS':
      return action.status;
    default:
      return state;
  }
}
