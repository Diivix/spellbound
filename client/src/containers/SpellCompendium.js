import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLightSpellsWithFilters, fetchLightSpellsWithFiltersFromFilters } from '../actions';
import _ from 'lodash';
import { Card, Menu, Dropdown, Header, Icon, Responsive, Loader } from 'semantic-ui-react';
import SpellCardWithPopup from '../components/SpellCard';

class SpellCompendiumComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByValue: 'name',
      filters: {}
    };

    this.setSortByValue = this.setSortByValue.bind(this);
    this.sortSpells = this.sortSpells.bind(this);
    this.addFilterFromEvent = this.addFilterFromEvent.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.fetchSpellsFromFilters = this.fetchSpellsFromFilters.bind(this);
  }

  componentDidMount() {
    if (this.props.authStatus === 'UNAUTHORISED') {
      this.props.changeRoute('login');
    }

    this.props.fetchLightSpellsWithFilters();
  }

  fetchSpellsFromFilters(filters) {
    this.props.fetchLightSpellsWithFiltersFromFilters(filters)
  }

  setSortByValue = (e, { name }) => {
    this.setState({
      sortByValue: name
    });
  };

  sortSpells = (name, spells) => {
    let sortedSpells = [];
    switch (name) {
      case 'name':
        sortedSpells = _.sortBy(spells, ['name', 'level', 'school'])
        break;
      case 'school':
        sortedSpells = _.sortBy(spells, ['school', 'name', 'level'])
        break;
      case 'level':
        sortedSpells = _.sortBy(spells, ['level', 'name', 'school'])
        break;
      default:
        sortedSpells = _.sortBy(spells, ['name', 'level', 'school'])
        break;
    }

    return sortedSpells;
  };

  addFilter = (name, value) => {
    let filters = this.state.filters;

    if (_.isEmpty(value) && filters[name]) {
      delete filters[name];
    } else {
      filters[name] = value;
    }

    this.setState({
      filters: filters
    });

    this.fetchSpellsFromFilters(filters);
  };

  addFilterFromEvent = (e, { name, value }) => {
    this.addFilter(name, value);
  };

  render() {
    // If we errored or the spells are empty, do not continue. The next section requires to be valid spells.
    if (this.props.spellsStatus === 'ERRORED') {
      return <Header><Icon size='big' color='red' name='exclamation triangle' /> Something went wrong!</Header>;
    } else if (_.isEmpty(this.props.spells)) {
      return <Loader active inline='centered' size='big'></Loader>;
    }

    const sortedSpells = this.sortSpells(this.state.sortByValue, this.props.spells);
    const spellCards = sortedSpells.map(spell => (
      <SpellCardWithPopup key={spell._id} spell={spell} />
    ));

    // Format filter values for dropdowns
    let nameFilters = this.props.filters.names
      .map(value => ({ key: value, text: _.upperFirst(value), value: value }));
    nameFilters = _.sortBy(nameFilters, [function (o) { return o.key; }]);

    const schoolsFilters = this.props.filters.schools
      .map(value => ({ key: value, text: _.upperFirst(value), value: value }))
      .sort((a, b) => a.key < b.key);

    const classesFilters = this.props.filters.classes
      .map(value => ({ key: value, text: _.upperFirst(value), value: value }))
      .sort((a, b) => a.key > b.key);

    let rangesFilters = this.props.filters.ranges.map(function (value) {
      let fullValue = value;
      if (!isNaN(value)) {
        fullValue += ' feet';
      }
      return { key: value, text: fullValue, value: value };
    });

    rangesFilters = _.sortBy(rangesFilters, function (o) {
      const v = parseInt(o.key, 10);
      return isNaN(v) ? o : v;
    });

    const componentsFilters = this.props.filters.components
      .map(value => ({ key: value, text: _.upperFirst(value), value: value }))
      .sort((a, b) => a.key < b.key);


    return (
      <div>
        {/* Sort Menu */}
        <Responsive as={Menu} pointing secondary stackable minWidth={Responsive.onlyTablet.minWidth}>
          <Menu.Item disabled name="Filters" position="left" icon="filter" />
          <Menu.Item name="Sort by" position="right" disabled />
          <Menu.Item
            name="name"
            active={this.state.sortByValue === 'name'}
            onClick={this.setSortByValue}
          />
          <Menu.Item
            name="school"
            active={this.state.sortByValue === 'school'}
            onClick={this.setSortByValue}
          />
          <Menu.Item
            name="level"
            active={this.state.sortByValue === 'level'}
            onClick={this.setSortByValue}
          />
        </Responsive>

        {/* Filters Menu */}
        <Responsive as={Menu} vertical floated borderless={true} minWidth={Responsive.onlyTablet.minWidth}>
          <Menu.Item>
            <Dropdown
              fluid
              multiple
              selection
              search
              closeOnChange
              minCharacters={1}
              placeholder="By Name..."
              onChange={this.addFilterFromEvent}
              options={nameFilters}
              name="name"
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              multiple
              selection
              search
              closeOnChange
              name="classes"
              placeholder="Classes"
              options={classesFilters}
              onChange={this.addFilterFromEvent}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              multiple
              selection
              search
              closeOnChange
              name="schools"
              placeholder="Schools"
              options={schoolsFilters}
              onChange={this.addFilterFromEvent}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              multiple
              selection
              search
              closeOnChange
              name="components"
              placeholder="Components"
              options={componentsFilters}
              onChange={this.addFilterFromEvent}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              fluid
              multiple
              selection
              search
              closeOnChange
              name="ranges"
              placeholder="Range"
              options={rangesFilters}
              onChange={this.addFilterFromEvent}
            />
          </Menu.Item>
        </Responsive>

        {/* Cards */}
        {
          // Testing the LOADING status here, otherwise along pause occures instead of a nice loader.
          this.props.spellsStatus === 'LOADING'
            ? (
              <Loader active inline='centered' size='big'></Loader>)
            : (
              <Card.Group doubling stackable itemsPerRow={4}>
                {spellCards}
              </Card.Group>
            )
        }
      </div>
    );
  }
}

SpellCompendiumComponent.propTypes = {
  changeRoute: PropTypes.func.isRequired,
  spells: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      classes: PropTypes.arrayOf(PropTypes.string).isRequired,
      castingTime: PropTypes.string.isRequired,
      castingTimeDescription: PropTypes.string.isRequired,
      range: PropTypes.string.isRequired,
      rangeDescription: PropTypes.string.isRequired,
      components: PropTypes.arrayOf(PropTypes.string).isRequired,
      duration: PropTypes.string.isRequired,
      durationDescription: PropTypes.string.isRequired
    })
  ).isRequired,
  filters: PropTypes.shape({
    name: PropTypes.arrayOf(PropTypes.string),
    schools: PropTypes.arrayOf(PropTypes.string),
    levels: PropTypes.arrayOf(PropTypes.number),
    classes: PropTypes.arrayOf(PropTypes.string),
    ranges: PropTypes.arrayOf(PropTypes.string),
    components: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  spellsStatus: PropTypes.string.isRequired,
  fetchLightSpellsWithFilters: PropTypes.func.isRequired,
  fetchLightSpellsWithFiltersFromFilters: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  spells: state.lightSpellsWithFilters.spells,
  filters: state.lightSpellsWithFilters.filters,
  spellsStatus: state.lightSpellsStatus,
  authStatus: state.authStatus
})

const mapDispatchToProps = (dispatch) => ({
  fetchLightSpellsWithFilters: () => dispatch(fetchLightSpellsWithFilters()),
  fetchLightSpellsWithFiltersFromFilters: (filters) => dispatch(fetchLightSpellsWithFiltersFromFilters(filters))
})

const SpellCompendium = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellCompendiumComponent);

export default SpellCompendium;
