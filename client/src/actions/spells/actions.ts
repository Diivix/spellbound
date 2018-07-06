import { Dispatch } from 'redux';
import {
  getLightSpellsWithFilters as getLightSpellsWithFiltersFromApi,
  getLightSpellsWithFiltersFromFilters as getLightSpellsWithFiltersFromFiltersFromApi,
  getSpell as getSpellFromApi
} from '../../api/spellsApi';
import { IFilters, ISpell, ISpellsWithFilters, IStoreState } from '../../models';
import keys from '../ActionTypeKeys';
import {
  IGetLightSpellsWithFiltersFailAction,
  IGetLightSpellsWithFiltersInProgressAction,
  IGetLightSpellsWithFiltersSuccessAction
} from './getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './getspell';

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
      const spellsWithFilters: ISpellsWithFilters = await getLightSpellsWithFiltersFromApi();

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
      const spellsWithFilters: ISpellsWithFilters = await getLightSpellsWithFiltersFromFiltersFromApi(filters);

      dispatch(lightSpellsWithFiltersSuccess(spellsWithFilters));
    } catch (err) {
      dispatch(lightSpellsWithFiltersFail(err));
    }
  };
}

function lightSpellsWithFiltersFail(error: Error): IGetLightSpellsWithFiltersFailAction {
  const errorType: keys.GET_LIGHTSPELLSWITHFILTERS_FAIL | keys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.GET_LIGHTSPELLSWITHFILTERS_UNAUTHORISED_FAIL : keys.GET_LIGHTSPELLSWITHFILTERS_FAIL;
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

function lightSpellsWithFiltersSuccess(lightSpellsWithFilters: ISpellsWithFilters): IGetLightSpellsWithFiltersSuccessAction {
  return {
    payload: lightSpellsWithFilters,
    type: keys.GET_LIGHTSPELLSWITHFILTERS_SUCCESS
  };
}

function spellFail(error: Error): IGetSpellFailAction {
  const errorType: keys.GET_SPELL_FAIL | keys.GET_SPELL_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.GET_SPELL_UNAUTHORISED_FAIL : keys.GET_SPELL_FAIL;

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
