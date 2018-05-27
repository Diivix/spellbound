import { createSelector } from "reselect";
import { IStoreState } from "../models";

// Derived data selectors = using reselect
const pendingActionsSelector = (state: IStoreState) => state.pendingActions;

export const isBusy = createSelector(
  [pendingActionsSelector],
  pendingActions => pendingActions > 0
);
