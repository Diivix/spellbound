import { RouterState } from 'react-router-redux';

export interface IStoreState {
  pendingActions: number;
  isAuthenticated: boolean;
  userData: IUserData;
  spellData: ISpellData;
  router?: RouterState;
}

export interface IUserData {
  username: string;
  email: string;
  lastSignedIn: number;
  favouriteSpells: ISpell[];
  characters: ICharacter[];
}

export interface ISpellData {
  currentSpell?: ISpell;
  spells?: ISpell[];
  filters?: IFilters;
  appliedFilters?: IFilters;
}

export interface ISpell {
  _id: string;
  atHigherLevels?: string;
  castingTime: string;
  classTypes: string[];
  components: string[];
  description?: string;
  duration: string;
  level: number;
  materials?: string;
  name: string;
  range: string;
  reference: string;
  school: string;
}

export interface ICharacterBase {
  name: string;
  level?: number;
  classType?: string;
  description?: string;
}
export interface ICharacter extends ICharacterBase {
  _id: string;
  dateCreated: number;
  dateLastModified: number;
  spells?: ISpell[];
}

export interface IFilters {
  classTypes: ISelectItem[];
  components: ISelectItem[];
  names: ISelectItem[];
  ranges: ISelectItem[];
  schools: ISelectItem[];
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ISelectItem {
  key: string;
  value: string;
}
