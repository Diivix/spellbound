import _ from 'lodash';
import { createSelector } from 'reselect';
import { isNull } from 'util';
import { ICharacter, ISpell, IStoreState } from '../models';

// Input Selectors
const pendingActionsSelector = (state: IStoreState) => state.pendingActions;

const spellsInCacheSelector = (state: IStoreState): ISpell[] | null => state.spellData.spells;

const getCharacterSelector = (state: IStoreState, characterId: string) => {
  if (isNull(state.userData)) {
    return null;
  } else {
    return state.userData.characters.find(character => character._id === characterId);
  }
};

const getSpellsSelector = (state: IStoreState): ISpell[] | null => {
  if (isNull(state.spellData.spells)) {
    return null;
  } else if (isNull(state.spellData.appliedFilters)) {
    return state.spellData.spells;
  } else {
    const { appliedFilters } = state.spellData;
    let { spells } = state.spellData;

    // This method uses AND operator between with filter type.
    // Filter: names
    if (!_.isEmpty(appliedFilters.names)) {
      spells = spells.filter(spell => {
        return _.includes(appliedFilters.names, spell.name);
      });
    }
    // Filter: classTypes
    if (!_.isEmpty(appliedFilters.classTypes)) {
      spells = spells.filter(spell => {
        for (const value of spell.classTypes) {
          return _.includes(appliedFilters.classTypes, value);
        }
        return false;
      });
    }
    // Filter: levels
    if (!_.isEmpty(appliedFilters.levels)) {
      spells = spells.filter(spell => {
        return _.includes(appliedFilters.levels, spell.level);
      });
    }
    // Filter: ranges
    if (!_.isEmpty(appliedFilters.ranges)) {
      spells = spells.filter(spell => {
        return _.includes(appliedFilters.ranges, spell.range);
      });
    }
    // Filter: schools
    if (!_.isEmpty(appliedFilters.schools)) {
      spells = spells.filter(spell => {
        return _.includes(appliedFilters.schools, spell.school);
      });
    }
    // Filter: components
    if (!_.isEmpty(appliedFilters.components)) {
      spells = spells.filter(spell => {
        for (const value of spell.components) {
          return _.includes(appliedFilters.components, value);
        }
        return false;
      });
    }
    
    return spells;
  }
};

// Memoised Selectors
export const isBusy = createSelector([pendingActionsSelector], pendingActions => pendingActions > 0);

export const hasSpells = createSelector([spellsInCacheSelector], (spells: ISpell[] | null) => {
  if (isNull(spells) || spells.length === 0) {
    return false;
  } else {
    return true;
  }
});

export const getCharacter = createSelector([getCharacterSelector], (character: ICharacter) => character);

// TODO: Use selector to get spells from filter
export const getSpells = createSelector([getSpellsSelector], (spells: ISpell[]) => spells);
