import { TabId } from '@blueprintjs/core';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Loader } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { getLightSpellsWithFilters, setAppliedFilters } from '../../actions/spells/actions';
// import CompendiumMenu from '../../components/CompendiumMenu';
import PopoverComponent from '../../components/spells/Popover';
import SpellSidebar from '../../components/spells/SpellSidebar';
import { IDropdownCollection, IFilters, ISpell, IStoreState } from '../../models';
import { getSpells, hasSpells, isBusy } from '../../selectors';
import './SpellCompendium.css';

interface IStateProps {
  appliedFilters?: IFilters | undefined;
  hasSpells: boolean;
  isBusy: boolean;
  filters: IFilters | undefined;
  getSpells: ISpell[] | undefined;
}

interface IDispatchProps {
  changeRoute: (path: string) => {};
  getLightSpellsWithFilters: () => {};
  setAppliedFilters: (filters: IFilters) => {};
}

interface IOwnState {
  sortByValue: string;
}

class SpellCompendiumComponent extends React.Component<IStateProps & IDispatchProps, IOwnState> {
  constructor(props: IStateProps & IDispatchProps) {
    super(props);
    this.state = {
      sortByValue: 'name'
    };
  }

  public componentDidMount() {
    if (!this.props.hasSpells || isUndefined(this.props.filters)) {
      this.props.getLightSpellsWithFilters();
    }
  }

  public render() {
    // Return imediately if we're busy or the filters or spell are undefined.
    if (this.props.isBusy || isUndefined(this.props.getSpells) || isUndefined(this.props.filters)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const appliedFilters = !isUndefined(this.props.appliedFilters)
      ? this.props.appliedFilters
      : {
          classTypes: [],
          components: [],
          // levels: [],
          names: [],
          ranges: [],
          schools: []
        };

    const possibleFilterValues: IFilters = this.props.filters;
    const sortedSpells: ISpell[] = this.sortSpells(this.state.sortByValue, this.props.getSpells);
    const spellCards: JSX.Element[] = sortedSpells.map(spell => (
      <PopoverComponent key={spell._id} spell={spell} changeRoute={this.props.changeRoute} />
    ));

    // Format filter values for dropdowns
    let namesFilters: IDropdownCollection[] = [];
    if (!isUndefined(possibleFilterValues.names)) {
      namesFilters = possibleFilterValues.names.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      namesFilters = _.sortBy(namesFilters, [(o: IDropdownCollection) => o.key]);
    }

    let schoolsFilters: IDropdownCollection[] = [];
    if (!isUndefined(possibleFilterValues.schools)) {
      schoolsFilters = possibleFilterValues.schools.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      schoolsFilters = _.sortBy(schoolsFilters, [(o: IDropdownCollection) => o.key]);
    }

    let classTypesFilters: IDropdownCollection[] = [];
    if (!isUndefined(possibleFilterValues.classTypes)) {
      classTypesFilters = possibleFilterValues.classTypes.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      classTypesFilters = _.sortBy(classTypesFilters, [(o: IDropdownCollection) => o.key]);
    }

    let rangesFilters: IDropdownCollection[] = [];
    if (!isUndefined(possibleFilterValues.ranges)) {
      // tslint:disable-next-line:only-arrow-functions
      rangesFilters = possibleFilterValues.ranges.map(function(filterValue) {
        let fullValue = filterValue;
        if (!isNaN(Number(fullValue))) {
          fullValue += ' feet';
        }

        return { key: filterValue, text: fullValue, value: filterValue };
      });

      rangesFilters = _.sortBy(rangesFilters, o => {
        const v = parseInt(o.key, 10);
        return isNaN(v) ? o : v;
      });
    }

    let componentsFilters: IDropdownCollection[] = [];
    if (!isUndefined(possibleFilterValues.components)) {
      componentsFilters = possibleFilterValues.components.map(filterValue => ({
        key: filterValue,
        text: _.upperFirst(filterValue),
        value: filterValue
      }));
      componentsFilters = _.sortBy(componentsFilters, [(o: IDropdownCollection) => o.key]);
    }

    return (
      <div className="container">
        <div className="wrapper">
          <div className="spell-sidebar">
            <SpellSidebar
              addFilterFromEvent={this.addFilterFromEvent}
              namesFilters={namesFilters}
              classTypesFilters={classTypesFilters}
              schoolsFilters={schoolsFilters}
              componentsFilters={componentsFilters}
              rangesFilters={rangesFilters}
              filters={appliedFilters}
              handleSortBy={this.handleSortBy} 
            />
          </div>
          <div className="card-group">{spellCards}</div>
        </div>
      </div>
    );
  }

  private handleSortBy = (newTabId: TabId): void => {
    this.setState({
      sortByValue: newTabId.toString()
    });
  };

  private sortSpells = (name: string, spells?: ISpell[]): ISpell[] => {
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

  private addFilter = (type: string, value: string): void => {
    const tempFilters = !isUndefined(this.props.appliedFilters)
      ? this.props.appliedFilters
      : {
          classTypes: [],
          components: [],
          // levels: [],
          names: [],
          ranges: [],
          schools: []
        };

    if (_.isEmpty(value) && tempFilters[type]) {
      tempFilters[type] = [];
    } else {
      tempFilters[type] = value;
    }

    this.props.setAppliedFilters(tempFilters);
  };

  private addFilterFromEvent = (type: string, value: string): void => {
    this.addFilter(type, value);
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    appliedFilters: state.spellData.appliedFilters,
    filters: state.spellData.filters,
    getSpells: getSpells(state),
    hasSpells: hasSpells(state),
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    changeRoute: (path: string) => dispatch(push(path)),
    getLightSpellsWithFilters: () => dispatch(getLightSpellsWithFilters()),
    setAppliedFilters: (filters: IFilters) => dispatch(setAppliedFilters(filters))
  };
}

const SpellCompendium = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellCompendiumComponent);
export default SpellCompendium;
