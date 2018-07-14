import { createSelector } from 'reselect';
import { isNull } from 'util';
import { ICharacter, IFilters, IStoreState } from '../models';

// Derived data selectors = using reselect
const pendingActionsSelector = (state: IStoreState) => state.pendingActions;
const getCharacterSelector = (state: IStoreState, characterId: string) => {
  if (isNull(state.userData)) {
    return null;
  } else {
    return state.userData.characters.find(character => character._id === characterId);
  }
};
const getSpellsSelector = (state: IStoreState, filters: IFilters) => {
  if(isNull(state.spellData.spellsWithFilters)) {
    return null;
  } else {
    // TODO: filter spells here.
    return state.spellData.spellsWithFilters.spells;
  }
};

export const isBusy = createSelector([pendingActionsSelector], pendingActions => pendingActions > 0);

export const getCharacter = createSelector([getCharacterSelector], (character: ICharacter) => character );

// TODO: Use selector to get spells from filter
export const getSpells = createSelector([getSpellsSelector], spells => {
  return spells;
});