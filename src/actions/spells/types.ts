import { IFilters, ISpell } from 'models';
import { TypedAction } from 'redoodle';

export const GetSpell = TypedAction.define('SPELLS::GET_SPELL')<{ spell: ISpell }>();

export const GetSpells = TypedAction.define('SPELLS::GET_SPELLS')<{ spells: ISpell[]; filters: IFilters }>();

export const SetFilters = TypedAction.define('SPELLS::SET_FILTERS')<{ filters: IFilters }>();
