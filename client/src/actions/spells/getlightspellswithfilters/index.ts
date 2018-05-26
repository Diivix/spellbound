import { ILightSpellsWithFilters } from "models";
import keys from "../../ActionTypeKeys";

export interface IGetLightSpellsWithFiltersSuccessAction {
  readonly type: keys.GETLIGHTSPELLSWITHFILTERS_SUCCESS;
  readonly payload: {
    readonly lightSpellsWithFilters: ILightSpellsWithFilters;
  };
}

export interface IGetLightSpellsWithFiltersInProgressAction {
  readonly type: keys.GETLIGHTSPELLSWITHFILTERS_INPROGRESS;
}

export interface IGetLightSpellsWithFiltersFailAction {
  readonly type: keys.GETLIGHTSPELLSWITHFILTERS_FAIL;
  readonly payload: {
    readonly error: Error;
  };
}
