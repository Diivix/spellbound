import { IFilters, ISpell, IStoreState } from '../models';

const emptyFilters: IFilters = {
  classes: [],
  components: [],
  levels: [],
  names: [],
  ranges: [],
  schools: []
};

const emptySpell: ISpell = {
  _id: '',
  atHigherLevels: '',
  castingTime: '',
  castingTimeDescription: '',
  classes: String[''],
  components: String[''],
  description: '',
  duration: '',
  durationDescription: '',
  level: 0,
  materials: '',
  name: '',
  range: '',
  rangeDescription: '',
  school: ''
};

const empltySpellData = {
  lightSpellsWithFilters: {
    filters: emptyFilters,
    spells: []
  },
  spellFromId: emptySpell
};

const emptyUserData = {
  characters: [],
  email: '',
  favouriteSpells: [],
  lastSignedIn: Date.now(),
  username: ''
};

const defaultState: IStoreState = {
  isAuthenticated: false,
  pendingActions: 0,
  spellData: empltySpellData,
  userData: emptyUserData
};

export default defaultState;
