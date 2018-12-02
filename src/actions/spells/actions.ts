import _ from 'lodash';
import { Dispatch } from 'redux';
import { getSpell as getSpellFromApi, getSpells as getSpellsFromApi } from '../../api/spellsApi';
import { IFilters, ISpell, IStoreState } from '../../models';
import { dispatchError } from '../common/actions';
import { InProgress } from '../common/types';
import { GetSpell, GetSpells, SetFilters } from './types';

export function getSpell(id: string): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());
    try {
      const spell: ISpell = await getSpellFromApi(id, getState().token);
      dispatch(GetSpell.create({ spell }));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function getLightSpellsWithFilters(): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());
    try {
      const spells: ISpell[] = await getSpellsFromApi(true, getState().token);
      const spellsWithFilters: {spells: ISpell[]; filters: IFilters} = {
        filters: getFilters(spells),
        spells
      }

      dispatch(GetSpells.create(spellsWithFilters));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function setAppliedFilters(filters: IFilters): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());
    dispatch(SetFilters({ filters }));
  };
}

function getFilters(spells: ISpell[]): IFilters {
  const names = spells.map(spell => spell.name);
  const schools = spells.map(spell => spell.school);
  const classTypes = spells.map(spell => spell.classTypes);
  const ranges = spells.map(spell => spell.range);
  const components = spells.map(spell => spell.components);

  return {
    classTypes: _.uniq(_.flattenDeep(classTypes)).map(value => {
      return { key: value.toString(), value: _.upperFirst(value.toString()) };
    }),
    components: _.uniq(_.flattenDeep(components)).map(value => {
      return { key: value.toString(), value: _.upperFirst(value.toString()) };
    }),
    names: names.map(value => {
      return { key: value, value: _.upperFirst(value) };
    }),
    ranges: _.uniq(ranges).map(value => {
      return { key: value, value: _.upperFirst(value) };
    }),
    schools: _.uniq(schools).map(value => {
      return { key: value, value: _.upperFirst(value) };
    })
  };
}
