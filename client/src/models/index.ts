export interface IStoreState {
  readonly pendingActions: number;
  readonly isAuthenticated: boolean;
  readonly userData: IUserData | null;
  readonly spellData: {
    readonly spellsWithFilters: ISpellsWithFilters | null,
    readonly currentSpell: ISpell | null;
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
  classes: string[];
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

export interface ICharacter {
  _id: string,
  name: string;
  level: number;
  class?: string;
  description?: string;
  dateCreated: number;
  dateLastModified: number;
  spells?: ISpell[];
}

export interface ISpellsWithFilters {
  readonly filters: IFilters;
  readonly spells: ISpell[];
}

export interface IFilters {
  classes: string[];
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