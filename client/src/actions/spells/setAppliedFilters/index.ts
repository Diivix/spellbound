import { IFilters } from "models";
import keys from "../../ActionTypeKeys";

export interface ISetFiltersSuccessAction {
  readonly type: keys.SET_FILTERS_SUCCESS;
  readonly payload: IFilters;
}

export interface ISetFiltersInprogressAction {
  readonly type: keys.SET_FILTERS_INPROGRESS;
}

export interface ISetFiltersFailAction {
  readonly type: keys.SET_FILTERS_FAIL | keys.SET_FILTERS_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}
