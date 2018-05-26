import { ILightSpellsWithFilters } from "models";

export default interface IStoreState {
  readonly pendingActions: number;
  readonly isAuthenticated: boolean;
  readonly lightSpellsWithFilters: ILightSpellsWithFilters;
};
