import _ from 'lodash';
import { createSelector } from 'reselect';
import { isUndefined } from 'util';
import { ICharacter, ISpell, IStoreState } from '../models';

// Input Selectors
const pendingActionsSelector = (state: IStoreState) => state.pendingActions;

const spellsInCacheSelector = (state: IStoreState): ISpell[] | undefined => state.spellData.spells;

const getCharacterSelector = (state: IStoreState, characterId: string) => {
  if (isUndefined(state.userData)) {
    return undefined;
  } else {
    return state.userData.characters.find(character => character.id === characterId);
  }
};

const getSpellsSelector = (state: IStoreState): ISpell[] | null => {
  if (isUndefined(state.spellData.spells)) {
    return null;
  } else if (isUndefined(state.spellData.appliedFilters)) {
    return state.spellData.spells;
  } else {
    const { appliedFilters } = state.spellData;
    let { spells } = state.spellData;

    // This method uses AND operator between with filter type.
    // Filter: names
    if (!_.isEmpty(appliedFilters.names)) {
      spells = spells.filter(spell => {
        return appliedFilters.names.findIndex(x => x.key === spell.name) !== -1;
      });
    }
    // Filter: classTypes
    if (!_.isEmpty(appliedFilters.classTypes)) {
      spells = spells.filter(spell => {
        for (const value of appliedFilters.classTypes) {
          return spell.classTypes.indexOf(value.key) !== -1;
        }
        return false;
      });
    }
    // Filter: ranges
    if (!_.isEmpty(appliedFilters.ranges)) {
      spells = spells.filter(spell => {
        return appliedFilters.ranges.findIndex(x => x.key === spell.range) !== -1;
      });
    }
    // Filter: schools
    if (!_.isEmpty(appliedFilters.schools)) {
      spells = spells.filter(spell => {
        return appliedFilters.schools.findIndex(x => x.key === spell.school) !== -1;
      });
    }
    // Filter: components
    if (!_.isEmpty(appliedFilters.components)) {
      spells = spells.filter(spell => {
        for (const value of appliedFilters.components) {
          return spell.components.indexOf(value.key) !== -1;
        }
        return false;
      });
    }

    return spells;
  }
};

// Memoised Selectors
export const isBusy = createSelector([pendingActionsSelector], pendingActions => pendingActions > 0);

export const hasSpells = createSelector([spellsInCacheSelector], (spells: ISpell[]) => {
  if (isUndefined(spells) || spells.length === 0) {
    return false;
  } else {
    return true;
  }
});

export const getCharacter = createSelector([getCharacterSelector], (character: ICharacter) => character);

// TODO: Use selector to get spells from filter
export const getSpells = createSelector([getSpellsSelector], (spells: ISpell[]) => spells);
