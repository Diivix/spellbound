import { IStoreState } from '../models';

const defaultState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  spellData: {},
  userData: {
    characters: [],
    email: "",
    favouriteSpells: [],
    lastSignedIn: 0,
    username: ""
  }
};

export default defaultState;
