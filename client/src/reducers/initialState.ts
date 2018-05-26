import { IFilters } from 'models';
import IStoreState from '../store/IStoreState';

const emptyFilters: IFilters = {
  classes: [],
  components: [],
  levels: [],
  names: [],
  ranges: [],
  schools: []
};

const defaultState: IStoreState = {
  isAuthenticated: false,
  lightSpellsWithFilters: { filters: emptyFilters, spells: [] },
  pendingActions: 0
};

export default defaultState;
