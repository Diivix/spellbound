import { IStoreState } from '../models';

export const initialState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  router: { location: null },
  spellData: {},
  userData: {
    characters: [],
    email: '',
    favouriteSpells: [],
    lastSignedIn: 0,
    username: ''
  }
};
