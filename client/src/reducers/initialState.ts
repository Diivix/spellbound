import { IStoreState } from '../models';

const defaultState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  spellData: {
    appliedFilters: null,
    currentSpell: null,
    filters: null,
    spells: null
  },
  userData: null
};

export default defaultState;
