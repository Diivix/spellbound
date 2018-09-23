import { Dispatch } from 'redux';
import { getLightSpellsWithFilters as getLightSpellsWithFiltersFromApi, getSpell as getSpellFromApi } from '../../api/spellsApi';
import { IFilters, ISpell, IStoreState } from '../../models';
import { dispatchError } from '../common/actions';
import { InProgress } from '../common/types';
import { GetSpell, GetSpells, SetFilters } from './types';

export function getSpell(id: string): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(InProgress.create());

    try {
      const spell: ISpell = await getSpellFromApi(id);
      dispatch(GetSpell.create({ spell }));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function getLightSpellsWithFilters(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());
    try {
      const spellsWithFilters: { spells: ISpell[]; filters: IFilters } = await getLightSpellsWithFiltersFromApi();
      dispatch(GetSpells.create(spellsWithFilters));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function setAppliedFilters(filters: IFilters): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());
    dispatch(SetFilters({ filters }));
  };
}
