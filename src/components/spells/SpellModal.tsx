import _ from 'lodash';
import React from 'react';
import { Grid, Header, Icon, Loader, Modal, Responsive } from 'semantic-ui-react';
import SpellMetaLayout from '../../components/spells/SpellMetaLayout';
import { ISpell } from '../../models';

interface IProps {
    isBusy: boolean;
    spell: ISpell;
    // TODO: Fix these any types.
    getSpell: any;
    show: any;
    closeModal: any;
}

class SpellModalComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount() {
        this.props.getSpell()
    }

    public render() {
        let modalView = <Grid.Row><Header><Icon size='big' color='red' name='exclamation triangle' /> Something went wrong!</Header></Grid.Row>;
        if (this.props.isBusy || _.isEmpty(this.props.spell)) {
            modalView = <Grid.Row><Loader active={true} inline='centered' size='big'/></Grid.Row>;
        } else if (!this.props.isBusy) {
            modalView =
                <Grid.Row>
                    <Responsive as={Grid.Column} width={5} minWidth={Responsive.onlyTablet.minWidth}>
                        <SpellMetaLayout spell={this.props.spell} />
                    </Responsive>
                    <Grid.Column width={11}>
                        <Header sub={true} color="grey" size="medium">Description</Header>
                        <p>{this.props.spell.description}</p>

                        {_.isEmpty(this.props.spell.atHigherLevels)
                            ? (
                                <div />
                            ) : (
                                <div>
                                    <Header sub={true} color="grey" size="medium">At Higher Levels</Header>
                                    <p>{this.props.spell.atHigherLevels}</p>
                                </div>
                            )
                        }
                    </Grid.Column>
                </Grid.Row>;
        }

        return (
            <Modal closeIcon={true} dimmer='blurring' open={this.props.show} onClose={this.props.closeModal}>
                <Modal.Header>{_.startCase(_.toLower(this.props.spell.name))}</Modal.Header>
                <Modal.Content as={Grid} celled="internally">
                    {modalView}
                </Modal.Content>
            </Modal>
        );
    }
}

// SpellModal.propTypes = {
//     fetchSpell: PropTypes.func.isRequired,
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool.isRequired,
//     spell: PropTypes.shape({
//         _id: PropTypes.string,
//         atHigherLevels: PropTypes.string,
//         castingTime: PropTypes.string,
//         castingTimeDescription: PropTypes.string,
//         classes: PropTypes.arrayOf(PropTypes.string),
//         components: PropTypes.arrayOf(PropTypes.string),
//         description: PropTypes.string,
//         duration: PropTypes.string,
//         durationDescription: PropTypes.string,
//         level: PropTypes.number,
//         name: PropTypes.string,
//         range: PropTypes.string,
//         rangeDescription: PropTypes.string,
//         school: PropTypes.string
//     }),
//     spellStatus: PropTypes.string.isRequired
// };

export default SpellModalComponent;