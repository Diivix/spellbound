
import { Action } from 'redux-actions';
import { IAuthState } from '../models/models';

export default function(state: IAuthState, action: Action<any>): IAuthState {
    return Object.assign({}, state, { state: action.payload });
}