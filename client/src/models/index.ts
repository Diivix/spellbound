export interface IStoreState {
  readonly pendingActions: number;
  readonly isAuthenticated: boolean;
  readonly userData: IUserData | undefined;
  readonly spellData: {
    readonly currentSpell: ISpell | undefined;
    readonly spells: ISpell[] | undefined;
    readonly filters: IFilters | undefined;
    readonly appliedFilters: IFilters | undefined;
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
  castingTimeDescription: string;
  classTypes: string[];
  components: string[];
  description?: string;
  duration: string;
  durationDescription: string;
  level: number;
  materials?: string;
  name: string;
  range: string;
  rangeDescription: string;
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