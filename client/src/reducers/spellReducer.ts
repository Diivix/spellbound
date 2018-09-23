import { ISpellData } from 'models';
import { TypedReducer } from 'redoodle';
import { GetSpell, GetSpells, SetFilters } from '../actions/spells/types';

export const spellReducer = TypedReducer.builder<ISpellData>()
  .withHandler(GetSpell.TYPE, (state, payload) => {
    return Object.assign({}, state, { currentSpell: payload.spell });
  })
  .withHandler(GetSpells.TYPE, (state, payload) => {
    return Object.assign({}, state, { spells: payload.spells, filters: payload.filters });
  })
  .withHandler(SetFilters.TYPE, (state, payload) => {
    return Object.assign({}, state, { appliedFilters: payload.filters });
  })
  .build();
