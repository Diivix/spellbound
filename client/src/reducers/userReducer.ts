import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import { IUserData } from '../models';
import { initialState } from '../store/initialState';

export default function userReducer(state = initialState.userData, action: ActionTypes) {
  switch (action.type) {
    case ActionTypeKeys.GET_USERDATA_SUCCESS:
      const userPayload: IUserData = action.payload;
      return Object.assign({}, state, userPayload );
    case ActionTypeKeys.CREATE_CHARACTER_SUCCESS:
      const userCreateCharacterPayload: IUserData = action.payload;
      return Object.assign({}, state, userCreateCharacterPayload);
    case ActionTypeKeys.UPDATE_CHARACTER_SUCCESS:
      const userUpdateCharacterPayload: IUserData = action.payload;
      return Object.assign({}, state, userUpdateCharacterPayload);
    case ActionTypeKeys.DELETE_CHARACTER_SUCCESS:
      const userDeleteCharacterPayload: IUserData = action.payload;
      return Object.assign({}, state, userDeleteCharacterPayload);
    default:
      return state;
  }
}
