import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.userData, action: ActionTypes) {
  switch (action.type) {
    case ActionTypeKeys.GET_USERDATA_SUCCESS:
      return Object.assign({}, state, action.payload );
    default:
      return state;
  }
}
