import { Dispatch } from 'redux';
import {
  getLightSpellsWithFilters as getLightSpellsWithFiltersFromApi,
  getLightSpellsWithFiltersFromFilters as getLightSpellsWithFiltersFromFiltersFromApi,
  getSpell as getSpellFromApi
} from '../../api/spellsApi';
import { IFilters, ILightSpellsWithFilters, ISpell, ISpellId } from '../../models';
import IStoreState from '../../store/IStoreState';
import keys from '../ActionTypeKeys';
import {
  IGetLightSpellsWithFiltersFailAction,
  IGetLightSpellsWithFiltersInProgressAction,
  IGetLightSpellsWithFiltersSuccessAction
} from './getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './getspell';

export function getSpell(id: ISpellId): (dispatch: Dispatch<IStoreState>) => Promise<void> {
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
      const spellsWithFilters: ILightSpellsWithFilters = await getLightSpellsWithFiltersFromApi();

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
      const spellsWithFilters: ILightSpellsWithFilters = await getLightSpellsWithFiltersFromFiltersFromApi(filters);

      dispatch(lightSpellsWithFiltersSuccess(spellsWithFilters));
    } catch (err) {
      dispatch(lightSpellsWithFiltersFail(err));
    }
  };
}

function lightSpellsWithFiltersFail(error: Error): IGetLightSpellsWithFiltersFailAction {
  const errorType: keys.GETLIGHTSPELLSWITHFILTERS_FAIL | keys.GETLIGHTSPELLSWITHFILTERS_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.GETLIGHTSPELLSWITHFILTERS_UNAUTHORISED_FAIL : keys.GETLIGHTSPELLSWITHFILTERS_FAIL;
  return {
    payload: {
      error
    },
    type: errorType
  };
}

function lightSpellsWithFiltersInProgress(): IGetLightSpellsWithFiltersInProgressAction {
  return {
    type: keys.GETLIGHTSPELLSWITHFILTERS_INPROGRESS
  };
}

function lightSpellsWithFiltersSuccess(lightSpellsWithFilters: ILightSpellsWithFilters): IGetLightSpellsWithFiltersSuccessAction {
  return {
    payload: lightSpellsWithFilters,
    type: keys.GETLIGHTSPELLSWITHFILTERS_SUCCESS
  };
}

function spellFail(error: Error): IGetSpellFailAction {
  const errorType: keys.GETSPELL_FAIL | keys.GETSPELL_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.GETSPELL_UNAUTHORISED_FAIL : keys.GETSPELL_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function spellInProgress(): IGetSpellInProgressAction {
  return {
    type: keys.GETSPELL_INPROGRESS
  };
}

function spellSuccess(spell: ISpell): IGetSpellSuccessAction {
  return {
    payload: spell,
    type: keys.GETSPELL_SUCCESS
  };
}
