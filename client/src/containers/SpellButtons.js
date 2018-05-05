import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSpellFromId } from '../actions';
import { Button } from 'semantic-ui-react';
import SpellModal from '../components/SpellModal';

class SpellButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false }

    this.toggleModal = this.toggleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fetchSpell = this.fetchSpell.bind(this);
  }

  toggleModal = () => {
    this.setState({ open: !this.state.open });
  }

  closeModal = () => {
    this.setState({ open: false })
  }

  fetchSpell = () => {
    this.props.fetchSpellFromId(this.props.spellId);
  }

  render() {
    return (
      <div>
        <Button.Group fluid size="mini">
          <Button basic color="red" icon="empty heart" />
          <Button basic color="blue" icon="users" />
          <Button basic color="teal" icon="content" onClick={this.toggleModal} />
        </Button.Group>

        {this.state.open
          ? (<SpellModal
            show={this.state.open}
            onClose={this.closeModal}
            spellStatus={this.props.spellStatus}
            fetchSpell={this.fetchSpell}
            spell={this.props.spell}
          />)
          : (<div />)
        }
      </div>

    );
  }
}

SpellButtons.propTypes = {
  spellId: PropTypes.string,
  spell: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    school: PropTypes.string,
    level: PropTypes.number,
    classes: PropTypes.arrayOf(PropTypes.string),
    castingTime: PropTypes.string,
    castingTimeDescription: PropTypes.string,
    range: PropTypes.string,
    rangeDescription: PropTypes.string,
    components: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.string,
    durationDescription: PropTypes.string,
    description: PropTypes.string,
    atHigherLevels: PropTypes.string
  }),
  spellStatus: PropTypes.string
}

const mapStateToProps = (state) => ({
  spell: state.spellFromId,
  spellStatus: state.spellFromIdStatus,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSpellFromId: (spellId) => dispatch(fetchSpellFromId(spellId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellButtons)
