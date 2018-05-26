export interface ISpell {
  _id: string;
  atHigherLevels: string;
  castingTime: string;
  castingTimeDescription: string;
  classes: string[];
  components: string[];
  description: string;
  duration: string;
  durationDescription: string;
  level: number;
  name: string;
  range: string;
  rangeDescription: string;
  school: string;
}

export interface ISpellCompendiumState {
  // filters: IFilters;
  spells: ISpell[];
}

export interface IAuthState {
  authStatus: string;
}

export interface ICredentials {
  email: string;
  password: string;
}