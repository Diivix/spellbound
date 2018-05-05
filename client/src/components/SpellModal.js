import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Header, Icon, Modal, Loader, Responsive } from 'semantic-ui-react';
import SpellMetaLayout from '../components/SpellMetaLayout';

class SpellModal extends React.Component {

    componentDidMount() {
        this.props.fetchSpell()
    }

    render() {
        let modalView = <Grid.Row><Header><Icon size='big' color='red' name='exclamation triangle' /> Something went wrong!</Header></Grid.Row>;
        if (this.props.spellStatus === 'LOADING' || (this.props.spellStatus === 'COMPLETED' && _.isEmpty(this.props.spell))) {
            modalView = <Grid.Row><Loader active inline='centered' size='big'></Loader></Grid.Row>;
        } else if (this.props.spellStatus === 'COMPLETED') {
            modalView =
                <Grid.Row>
                    <Responsive as={Grid.Column} width={5} minWidth={Responsive.onlyTablet.minWidth}>
                        <SpellMetaLayout spell={this.props.spell} />
                    </Responsive>
                    <Grid.Column width={11}>
                        <Header sub color="grey" size="medium">Description</Header>
                        <p>{this.props.spell.description}</p>

                        {_.isEmpty(this.props.spell.atHigherLevels)
                            ? (
                                <div />
                            ) : (
                                <div>
                                    <Header sub color="grey" size="medium">At Higher Levels</Header>
                                    <p>{this.props.spell.atHigherLevels}</p>
                                </div>
                            )
                        }
                    </Grid.Column>
                </Grid.Row>;
        }

        return (
            <Modal closeIcon dimmer='blurring' open={this.props.show} onClose={this.props.closeModal}>
                <Modal.Header>{_.startCase(_.toLower(this.props.spell.name))}</Modal.Header>
                <Modal.Content as={Grid} celled="internally">
                    {modalView}
                </Modal.Content>
            </Modal>
        );
    }
}

SpellModal.propTypes = {
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
    spellStatus: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fetchSpell: PropTypes.func.isRequired
};

export default SpellModal;