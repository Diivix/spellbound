export interface IStoreState {
  readonly pendingActions: number;
  readonly isAuthenticated: boolean;
  readonly lightSpellsWithFilters: ILightSpellsWithFilters;
};

export interface ISpellId {
  id: string;
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
  name: string;
  range: string;
  rangeDescription: string;
  school: string;
}

export interface IFilters {
  classes: string[];
  components: string[];
  levels: number[];
  names: string[];
  ranges: string[];
  schools: string[];
}

export interface ILightSpellsWithFilters {
  filters: IFilters;
  spells: ISpell[];
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