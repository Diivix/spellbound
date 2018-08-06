import { Dispatch } from 'redux';
import {
  getLightSpellsWithFilters as getLightSpellsWithFiltersFromApi,
  getLightSpellsWithFiltersFromFilters as getLightSpellsWithFiltersFromFiltersFromApi,
  getSpell as getSpellFromApi
} from '../../api/spellsApi';
import { IFilters, ISpell, IStoreState } from '../../models';
import keys from '../ActionTypeKeys';
import {
  IGetLightSpellsWithFiltersFailAction,
  IGetLightSpellsWithFiltersInProgressAction,
  IGetLightSpellsWithFiltersSuccessAction
} from './getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './getspell';
import { ISetFiltersFailAction, ISetFiltersInprogressAction, ISetFiltersSuccessAction } from './setAppliedFilters';

export function getSpell(id: string): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(spellInProgress());

    try {
      const spell: ISpell = await getSpellFromApi(id);

      dispatch(spellSuccess(spell));
    } catch (err) {
      dispatch(spellFail(err));
    }
  };
}

export function getLightSpellsWithFilters(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(lightSpellsWithFiltersInProgress());

    try {
      const spellsWithFilters: { spells: ISpell[]; filters: IFilters } = await getLightSpellsWithFiltersFromApi();

      dispatch(lightSpellsWithFiltersSuccess(spellsWithFilters));
    } catch (err) {
      dispatch(lightSpellsWithFiltersFail(err));
    }
  };
}

export function getLightSpellsWithFiltersFromFilters(filters: IFilters): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(lightSpellsWithFiltersInProgress());

    try {
      const spellsWithFilters: { spells: ISpell[]; filters: IFilters } = await getLightSpellsWithFiltersFromFiltersFromApi(filters);

      dispatch(lightSpellsWithFiltersSuccess(spellsWithFilters));
    } catch (err) {
      dispatch(lightSpellsWithFiltersFail(err));
    }
  };
}

export function setAppliedFilters(filters: IFilters): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(setFiltersInProgress());
    try {
      dispatch(setFiltersSuccess(filters));
    } catch (err) {
      dispatch(setFiltersFail(err));
    }
  };
}

function lightSpellsWithFiltersFail(error: Error): IGetLightSpellsWithFiltersFailAction {
  const errorType: keys.GET_LIGHTSPELLSWITHFILTERS_FAIL | keys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED : keys.GET_LIGHTSPELLSWITHFILTERS_FAIL;
  return {
    payload: {
      error
    },
    type: errorType
  };
}

function lightSpellsWithFiltersInProgress(): IGetLightSpellsWithFiltersInProgressAction {
  return {
    type: keys.GET_LIGHTSPELLSWITHFILTERS_INPROGRESS
  };
}

function lightSpellsWithFiltersSuccess(lightSpellsWithFilters: {
  spells: ISpell[];
  filters: IFilters;
}): IGetLightSpellsWithFiltersSuccessAction {
  return {
    payload: lightSpellsWithFilters,
    type: keys.GET_LIGHTSPELLSWITHFILTERS_SUCCESS
  };
}

function spellFail(error: Error): IGetSpellFailAction {
  const errorType: keys.GET_SPELL_FAIL | keys.GET_SPELL_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.GET_SPELL_UNAUTHORISED : keys.GET_SPELL_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function spellInProgress(): IGetSpellInProgressAction {
  return {
    type: keys.GET_SPELL_INPROGRESS
  };
}

function spellSuccess(spellFromId: ISpell): IGetSpellSuccessAction {
  return {
    payload: spellFromId,
    type: keys.GET_SPELL_SUCCESS
  };
}

function setFiltersFail(error: Error): ISetFiltersFailAction {
  const errorType: keys.SET_FILTERS_FAIL | keys.SET_FILTERS_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.SET_FILTERS_UNAUTHORISED : keys.SET_FILTERS_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function setFiltersInProgress(): ISetFiltersInprogressAction {
  return {
    type: keys.SET_FILTERS_INPROGRESS
  };
}

function setFiltersSuccess(filters: IFilters): ISetFiltersSuccessAction {
  return {
    payload: filters,
    type: keys.SET_FILTERS_SUCCESS
  };
}
