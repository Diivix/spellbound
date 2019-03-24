import { FormGroup, IBreadcrumbProps, TabId } from '@blueprintjs/core';
import { addSpell, getCharacters, removeSpell } from 'actions/characters/actions';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNull, isUndefined } from 'util';
import { getLightSpellsWithFilters, setAppliedFilters } from '../../actions/spells/actions';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import { Loader } from '../../components/loader/Loader';
import DropdownMultiSelect from '../../components/MultiSelectWrapper';
import PopoverComponent from '../../components/spells/Popover';
import SpellSidebar from '../../components/spells/SpellSidebar';
import { ICharacter, ICharacterSimple, IFilters, ISelectItem, ISpell, IStoreState } from '../../models';
import { getCharactersSimple, getSpells, hasSpells, isBusy } from '../../selectors';

interface IStateProps {
  appliedFilters?: IFilters | undefined;
  characters: ICharacter[] | null;
  hasSpells: boolean;
  isBusy: boolean;
  filters: IFilters | undefined;
  getCharactersSimple: ICharacterSimple[] | undefined;
  getSpells: ISpell[] | undefined;
}

interface IDispatchProps {
  addSpellToCharacter: (characterId: number, spellId: number) => {};
  changeRoute: (path: string) => {};
  getCharacters: () => {};
  getLightSpellsWithFilters: () => {};
  removeSpellFromCharacter: (characterId: number, spellId: number) => {};
  setAppliedFilters: (filters: IFilters) => {};
}

interface IState {
  sortByValue: string;
}

class SpellCompendiumComponent extends React.Component<IStateProps & IDispatchProps, IState> {
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

    if (isNull(this.props.characters)) {
      this.props.getCharacters();
    }
  }

  public render() {
    // Return imediately if we're busy or the filters or spell are undefined.
    if (this.props.isBusy || isUndefined(this.props.getSpells) || isUndefined(this.props.filters)) {
      return <Loader />;
    }

    const breadcrumbs: IBreadcrumbProps[] = [{ text: "Spells" }];

    const appliedFilters = !isUndefined(this.props.appliedFilters)
      ? this.props.appliedFilters
      : {
          classTypes: [],
          components: [],
          names: [],
          ranges: [],
          schools: []
        };

    const possibleFilterValues: IFilters = this.props.filters;
    const sortedSpells: ISpell[] = this.sortSpells(this.state.sortByValue, this.props.getSpells);
    const spellCards: JSX.Element[] = sortedSpells.map(spell => (
      <PopoverComponent key={spell.id} spell={spell} changeRoute={this.props.changeRoute} characters={this.props.getCharactersSimple} addSpellToCharacter={this.props.addSpellToCharacter} removeSpellFromCharacter={this.props.removeSpellFromCharacter} />
    ));

    // Format filter values for dropdowns
    let namesFilters: ISelectItem[] = [];
    if (!isUndefined(possibleFilterValues.names)) {
      namesFilters = possibleFilterValues.names.map(filter => ({
        key: filter.key,
        value: _.upperFirst(filter.value)
      }));
      namesFilters = _.sortBy(namesFilters, [(o: ISelectItem) => o.key]);
    }

    let schoolsFilters: ISelectItem[] = [];
    if (!isUndefined(possibleFilterValues.schools)) {
      schoolsFilters = possibleFilterValues.schools.map(filter => ({
        key: filter.key,
        value: _.upperFirst(filter.value)
      }));
      schoolsFilters = _.sortBy(schoolsFilters, [(o: ISelectItem) => o.key]);
    }

    let classTypesFilters: ISelectItem[] = [];
    if (!isUndefined(possibleFilterValues.classTypes)) {
      classTypesFilters = possibleFilterValues.classTypes.map(filter => ({
        key: filter.key,
        value: _.upperFirst(filter.value)
      }));
      classTypesFilters = _.sortBy(classTypesFilters, [(o: ISelectItem) => o.key]);
    }

    let rangesFilters: ISelectItem[] = [];
    if (!isUndefined(possibleFilterValues.ranges)) {
      rangesFilters = possibleFilterValues.ranges.map(x => {
        return { key: x.key, value: x.value };
      });
      rangesFilters = _.sortBy(rangesFilters, o => o.value);
    }

    let componentsFilters: ISelectItem[] = [];
    if (!isUndefined(possibleFilterValues.components)) {
      componentsFilters = possibleFilterValues.components.map(filter => ({
        key: filter.key,
        value: _.upperFirst(filter.value)
      }));
      componentsFilters = _.sortBy(componentsFilters, [(o: ISelectItem) => o.key]);
    }

    return (
      <div className="sb-container">
        <BreadcrumbsComponent items={breadcrumbs} />
        <div className="sb-wrapper">
            <SpellSidebar handleSortBy={this.handleSortBy}>
              <FormGroup label="Names" labelFor="names-dropdown">
                <DropdownMultiSelect
                  id="names-dropdown"
                  type="names"
                  items={namesFilters}
                  addFilter={this.addFilter}
                  placeholder="Names..."
                  selectedItems={appliedFilters.names}
                />
              </FormGroup>
              <FormGroup label="Classes" labelFor="classtypes-dropdown">
                <DropdownMultiSelect
                  id="classtypes-dropdown"
                  type="classTypes"
                  items={classTypesFilters}
                  addFilter={this.addFilter}
                  placeholder="Classes..."
                  selectedItems={appliedFilters.classTypes}
                />
              </FormGroup>
              <FormGroup label="Schools" labelFor="schools-dropdown">
                <DropdownMultiSelect
                  id="schools-dropdown"
                  type="schools"
                  items={schoolsFilters}
                  addFilter={this.addFilter}
                  placeholder="Schools..."
                  selectedItems={appliedFilters.schools}
                />
              </FormGroup>
              <FormGroup label="Components" labelFor="components-dropdown">
                <DropdownMultiSelect
                  id="components-dropdown"
                  type="components"
                  items={componentsFilters}
                  addFilter={this.addFilter}
                  placeholder="Components..."
                  selectedItems={appliedFilters.components}
                />
              </FormGroup>
              <FormGroup label="Range" labelFor="ranges-dropdown">
                <DropdownMultiSelect
                  id="ranges-dropdown"
                  type="ranges"
                  items={rangesFilters}
                  addFilter={this.addFilter}
                  placeholder="Range..."
                  selectedItems={appliedFilters.ranges}
                />
              </FormGroup>
            </SpellSidebar>
          <div className="sb-card-group">{spellCards}</div>
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

  private addFilter = (type: string, filter: ISelectItem): void => {
    const tempFilters: IFilters = !isUndefined(this.props.appliedFilters)
      ? this.props.appliedFilters
      : {
          classTypes: [],
          components: [],
          names: [],
          ranges: [],
          schools: []
        };

    if (_.isEmpty(filter.value) && tempFilters[type]) {
      tempFilters[type] = [];
    } else {
      tempFilters[type] = [filter];
    }

    this.props.setAppliedFilters(tempFilters);
  };
}

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    appliedFilters: state.spellData.appliedFilters,
    characters: state.userData.characters,
    filters: state.spellData.filters,
    getCharactersSimple: getCharactersSimple(state),
    getSpells: getSpells(state),
    hasSpells: hasSpells(state),
    isBusy: isBusy(state)
  };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
  return {
    addSpellToCharacter: (characterId: number, spellId: number) => dispatch(addSpell(characterId, spellId)),
    changeRoute: (path: string) => dispatch(push(path)),
    getCharacters: () => dispatch(getCharacters()),
    getLightSpellsWithFilters: () => dispatch(getLightSpellsWithFilters()),
    removeSpellFromCharacter: (characterId: number, spellId: number) => dispatch(removeSpell(characterId, spellId)),
    setAppliedFilters: (filters: IFilters) => dispatch(setAppliedFilters(filters))
  };
}

const SpellCompendium = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellCompendiumComponent);
export default SpellCompendium;
