import { IStoreState } from '../models';

const defaultState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  spellData: {
    appliedFilters: undefined,
    currentSpell: undefined,
    filters: undefined,
    spells: undefined
  },
  userData: undefined
};

export default defaultState;
