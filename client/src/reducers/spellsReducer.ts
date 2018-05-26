import ActionTypeKeys from "../actions/ActionTypeKeys";
import ActionTypes from "../actions/ActionTypes";
import initialState from "./initialState";

export default function spellsReducer(
  state = initialState.lightSpellsWithFilters,
  action: ActionTypes
) {
  switch (action.type) {
    case ActionTypeKeys.GETLIGHTSPELLSWITHFILTERS_SUCCESS:
      return Object.assign({}, state,  action.payload)
    case ActionTypeKeys.GETSPELL_SUCCESS:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}