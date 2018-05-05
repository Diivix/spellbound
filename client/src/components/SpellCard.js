import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Card, Divider, Popup, Image, Segment } from 'semantic-ui-react';
import SpellMetaLayout from './SpellMetaLayout';
import SpellButtons from '../containers/SpellButtons';

class SpellCardWithPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }

        const name = _.truncate(_.startCase(_.toLower(this.props.spell.name)), { length: 20 });

        const meta = this.buildLevelWithSchool(
            this.props.spell.level,
            this.props.spell.school,
            true
        );

        const cardStyle = { margin: '5px' }
        const headerStyle = { display: 'inline' }
        // Hacky workaround because Semantic UI has a bug when using a custom React component as the Popup trigger.
        this.spellCard = (
            <Card style={cardStyle}>
                <Card.Content>
                <Image floated='left' size="mini" src={require('../assets/firespell.jpg')} />
                    <Card.Header style={headerStyle}>
                        {name}
                    </Card.Header>
                    <Card.Meta textAlign='left'>{meta}</Card.Meta>
                </Card.Content>
            </Card>
        );

        this.buildLevelWithSchool = this.buildLevelWithSchool.bind(this);
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    buildLevelWithSchool = (level, school, truncateValue) => {
        school = _.upperFirst(school);

        let value;
        switch (level) {
            case 0:
                value = school + ' cantrip';
                break;
            case 1:
                value = level + 'st level ' + school;
                break;
            case 2:
                value = level + 'nd level ' + school;
                break;
            case 3:
                value = level + 'rd level ' + school;
                break;
            default:
                value = level + 'th level ' + school;
                break;
        }

        return (value = truncateValue ? _.truncate(value, { length: 20 }) : value);
    };

    render() {
        return (
            <div>
                <Popup trigger={this.spellCard} on="focus" position="bottom center">
                    <SpellMetaLayout spell={this.props.spell} />

                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <SpellButtons spellId={this.props.spell._id} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Popup>
            </div>
        );
    }
}

SpellCardWithPopup.propTypes = {
    spell: PropTypes.shape({
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
        durationDescription: PropTypes.string.isRequired,
        // description: PropTypes.string.isRequired,
        // atHigherLevels: PropTypes.string.isRequired
    }).isRequired
};

export default SpellCardWithPopup;
