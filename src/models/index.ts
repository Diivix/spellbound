import { RouterState } from 'react-router-redux';

export interface IStoreState {
  isAuthenticated: boolean;
  pendingActions: number;
  router?: RouterState;
  spellData: ISpellData;
  // TODO: This should change or mitigate against XSS attacks. Store the token on the server?
  token: string;
  userData: IUserData;
}

export interface IUserData {
  userName: string;
  characters: ICharacter[];
}

export interface ISpellData {
  currentSpell?: ISpell;
  spells?: ISpell[];
  filters?: IFilters;
  appliedFilters?: IFilters;
}

export interface ISpell {
  id: number;
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
  id: number;
  dateCreated: number;
  dateLastModified: number;
  spells?: ISpell[];
}

export interface ICharacterSimple {
  id: number;
  name: string;
  spellIds: number[];
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
