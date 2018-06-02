import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function spellsReducer(state = initialState.spellData, action: ActionTypes) {
  switch (action.type) {
    case ActionTypeKeys.GET_LIGHTSPELLSWITHFILTERS_SUCCESS:
      return Object.assign({}, state, { lightSpellsWithFilters: action.payload });
    case ActionTypeKeys.GET_SPELL_SUCCESS:
      return Object.assign({}, state, { spellFromId: action.payload });
    default:
      return state;
  }
}
