export interface IStoreState {
  readonly pendingActions: number;
  readonly isAuthenticated: boolean;
  readonly userData: IUserData;
  readonly spellData: {
    readonly currentSpell?: ISpell;
    readonly spells?: ISpell[];
    readonly filters?: IFilters;
    readonly appliedFilters?: IFilters;
  };
};

export interface IUserData {
  username: string;
  email: string;
  lastSignedIn: number;
  favouriteSpells: ISpell[];
  characters: ICharacter[];
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
  _id: string,
  dateCreated: number;
  dateLastModified: number;
  spells?: ISpell[];
}

export interface IFilters {
  classTypes: string[];
  components: string[];
  levels: number[];
  names: string[];
  ranges: string[];
  schools: string[];
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IDropdownCollection {
  key: string;
  text: string;
  value: string;
}