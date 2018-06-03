import { IStoreState } from '../models';

const defaultState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  spellData: {
    currentSpell: null,
    spellsWithFilters: null
  },
  userData: null
};

export default defaultState;
