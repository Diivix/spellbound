import { ISpell, ISpellsWithFilters } from 'models';
import ActionTypeKeys from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function spellsReducer(state = initialState.spellData, action: ActionTypes) {
  switch (action.type) {
    case ActionTypeKeys.GET_LIGHTSPELLSWITHFILTERS_SUCCESS:
      const spellsWithFiltersPayload: ISpellsWithFilters = action.payload;
      return Object.assign({}, state, { spellsWithFilters: spellsWithFiltersPayload });
    case ActionTypeKeys.GET_SPELL_SUCCESS:
      const spellPayload: ISpell = action.payload;
      return Object.assign({}, state, { currentSpell: spellPayload });
    default:
      return state;
  }
}
