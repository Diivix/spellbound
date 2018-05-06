import { connect } from 'react-redux';
import { spellsWithFiltersFetchData } from '../actions';
import SpellCompendium from './SpellCompendium';
import React from 'react';

const mapStateToProps = (state) => ({
  spells: state.spellsWithFilters.spells,
  filters: state.spellsWithFilters.filters,
  hasErrored: state.spellsHasErrored,
  isLoading: state.spellsIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: (url) => dispatch(spellsWithFiltersFetchData(url))
})

const VisibleSpells = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellCompendium)

export default VisibleSpells;