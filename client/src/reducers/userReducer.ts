import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import { IUserData } from '../models';
import initialState from './initialState';

export default function userReducer(state = initialState.userData, action: ActionTypes) {
  switch (action.type) {
    case ActionTypeKeys.GET_USERDATA_SUCCESS:
      const userPayload: IUserData = action.payload;
      return Object.assign({}, state, userPayload );
    default:
      return state;
  }
}
