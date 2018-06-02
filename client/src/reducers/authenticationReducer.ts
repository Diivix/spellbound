import ActionTypeKeys from "../actions/ActionTypeKeys";
import ActionTypes from "../actions/ActionTypes";
import initialState from "./initialState";

export default function authenticationReducer(
  state = initialState.isAuthenticated,
  action: ActionTypes
) {
  switch (action.type) {
    case ActionTypeKeys.SIGNIN_SUCCESS:
      return true;
    case ActionTypeKeys.SIGNOUT_SUCCESS:
      return false;
    case ActionTypeKeys.GET_SPELL_UNAUTHORISED_FAIL:
      return false;
    case ActionTypeKeys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED_FAIL:
      return false;
    default:
      return state;
  }
}


