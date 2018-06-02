import SpellFilterMenuComponent from 'components/SpellFilterMenu';
import _ from 'lodash';
import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Card, InputOnChangeData, Loader, Menu } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { getLightSpellsWithFilters, getLightSpellsWithFiltersFromFilters } from '../actions/spells/spellsActions';
import SortMenu from '../components/SortMenu';
import SpellCardWithPopup from '../components/SpellCard';
import { IDropdownCollection, IFilters, ISpell, IStoreState } from '../models';
import { isBusy } from '../selectors';

interface ISpellCompendiumStateProps {
  isAuthenticated: boolean;
  isBusy: boolean;
  filters: IFilters;
  lightSpells?: ISpell[];
}

interface ISpellCompendiumDispatchProps {
  // tslint:disable-next-line:ban-types
  getLightSpellsWithFilters: Function;
  // tslint:disable-next-line:ban-types
  getLightSpellsWithFiltersFromFilters: Function;
}

interface IState {
  filters: IFilters;
  sortByValue: string;
}

class SpellCompendiumComponent extends React.Component<ISpellCompendiumStateProps & ISpellCompendiumDispatchProps, IState> {
  constructor(props: ISpellCompendiumStateProps & ISpellCompendiumDispatchProps) {
    super(props);
    this.state = {
      filters: {
        classes: [],
        components: [],
        levels: [],
        names: [],
        ranges: [],
        schools: []
      },
      sortByValue: 'name'
    };
  }

  public componentDidMount() {
    this.props.getLightSpellsWithFilters();
  }

  public getLightSpellsWithFiltersFromFilters = (filters: IFilters) => {
    // tslint:disable-next-line:no-console
    console.log(filters);
    this.props.getLightSpellsWithFiltersFromFilters(filters);
  };

  public setSortByValue = (e: SyntheticEvent<any>, data: InputOnChangeData) => {
    this.setState({
      sortByValue: data.name
    });
  };

  public sortSpells = (name: string, spells?: ISpell[]) => {
    let sortedSpells = [];
    switch (name) {
      case 'name':
        sortedSpells = _.sortBy(spells, ['name', 'level', 'school']);
        break;
      case 'school':
        sortedSpells = _.sortBy(spells, ['school', 'name', 'level']);
        break;
      case 'level':
        sortedSpells = _.sortBy(spells, ['level', 'name', 'school']);
        break;
      default:
        sortedSpells = _.sortBy(spells, ['name', 'level', 'school']);
        break;
    }

    return sortedSpells;
  };

  public addFilter = (name: string, value: string) => {
    const tempFilters: IFilters = this.state.filters;

    if (_.isEmpty(value) && tempFilters[name]) {
      delete tempFilters[name];
    } else {
      tempFilters[name] = value;
    }

    this.setState({
      filters: tempFilters
    });

    this.getLightSpellsWithFiltersFromFilters(this.state.filters);
  };

  public addFilterFromEvent = (e: SyntheticEvent<any>, data: InputOnChangeData) => {
    this.addFilter(data.name, data.value);
  };

  public render() {
    // Return imediately if we're busy or the filters or spell are undefined.
    if (this.props.isBusy || isUndefined(this.props.filters) || isUndefined(this.props.lightSpells)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const sortedSpells = this.sortSpells(this.state.sortByValue, this.props.lightSpells);
    const spellCards = sortedSpells.map(spell => <SpellCardWithPopup key={spell._id} spell={spell} />);

    // Format filter values for dropdowns
    let namesFilters: IDropdownCollection[] = [];
    if (!isUndefined(this.props.filters.names)) {
      namesFilters = this.props.filters.names.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      namesFilters = _.sortBy(namesFilters, [(o: IDropdownCollection) => o.key]);
    }

    let schoolsFilters: IDropdownCollection[] = [];
    if (!isUndefined(this.props.filters.schools)) {
      schoolsFilters = this.props.filters.schools.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      schoolsFilters = _.sortBy(schoolsFilters, [(o: IDropdownCollection) => o.key]);
    }

    let classesFilters: IDropdownCollection[] = [];
    if (!isUndefined(this.props.filters.classes)) {
      classesFilters = this.props.filters.classes.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      classesFilters = _.sortBy(classesFilters, [(o: IDropdownCollection) => o.key]);
    }

    let rangesFilters: IDropdownCollection[] = [];
    if (!isUndefined(this.props.filters.ranges)) {
      // tslint:disable-next-line:only-arrow-functions
      rangesFilters = this.props.filters.ranges.map(function(filterValue) {
        let fullValue = filterValue;
        if (!isNaN(Number(fullValue))) {
          fullValue += ' feet';
        }

        return { key: filterValue, text: fullValue, value: filterValue };
      });

      // tslint:disable-next-line:only-arrow-functions
      rangesFilters = _.sortBy(rangesFilters, function(o) {
        const v = parseInt(o.key, 10);
        return isNaN(v) ? o : v;
      });
    }

    let componentsFilters: IDropdownCollection[] = [];
    if (!isUndefined(this.props.filters.components)) {
      componentsFilters = this.props.filters.components.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      // .sort((a, b) => a.key < b.key);
      componentsFilters = _.sortBy(componentsFilters, [(o: IDropdownCollection) => o.key]);
    }

    return (
      <div>
        <SortMenu>
          <Menu.Item disabled={true} name="Filters" position="left" icon="filter" />
          <Menu.Item name="Sort by" position="right" disabled={true} />
          <Menu.Item name="name" active={this.state.sortByValue === 'name'} onClick={this.setSortByValue} />
          <Menu.Item name="school" active={this.state.sortByValue === 'school'} onClick={this.setSortByValue} />
          <Menu.Item name="level" active={this.state.sortByValue === 'level'} onClick={this.setSortByValue} />
        </SortMenu>

        <SpellFilterMenuComponent
          addFilterFromEvent={this.addFilterFromEvent}
          namesFilters={namesFilters}
          classesFilters={classesFilters}
          schoolsFilters={schoolsFilters}
          componentsFilters={componentsFilters}
          rangesFilters={rangesFilters}
          filters={this.state.filters}
        />

        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
          {spellCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): ISpellCompendiumStateProps {
  return {
    filters: state.spellData.lightSpellsWithFilters.filters,
    isAuthenticated: state.isAuthenticated,
    isBusy: isBusy(state),
    lightSpells: state.spellData.lightSpellsWithFilters.spells
  };
}

function mapDispatchToProps(dispatch: any): ISpellCompendiumDispatchProps {
  return {
    getLightSpellsWithFilters: () => dispatch(getLightSpellsWithFilters()),
    getLightSpellsWithFiltersFromFilters: (filters: IFilters) => dispatch(getLightSpellsWithFiltersFromFilters(filters))
  };
}

const SpellCompendium = connect(mapStateToProps, mapDispatchToProps)(SpellCompendiumComponent);
export default SpellCompendium;
