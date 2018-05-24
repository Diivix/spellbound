import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Grid,
  Header
} from 'semantic-ui-react';

class SpellMetaLayout extends React.Component {
  constructor(props) {
    super(props);

    this.buildCastingTimeValue = this.buildCastingTimeValue.bind(this);
    this.buildLevelWithSchool = this.buildLevelWithSchool.bind(this);
    this.buildRangeValue = this.buildRangeValue.bind(this);
  }


  buildCastingTimeValue = (castingTime, castingTimeDescription) => {
    if (castingTimeDescription) {
      castingTime = +' (' + castingTimeDescription + ')';
    }
    return castingTime;
  };

  buildRangeValue = (range, rangeDescription) => {
    if (rangeDescription) {
      range += ' (' + rangeDescription + ')';
    }
    return range;
  };

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
    const levelWithSchool = this.buildLevelWithSchool(
      this.props.spell.level,
      this.props.spell.school,
      false
    );
    const components = this.props.spell.components
      .map(component => _.upperCase(component))
      .join(', ');
    const classes = this.props.spell.classes
      .map(clss => _.capitalize(clss))
      .join(' · ');
    const materials = _.upperFirst(this.props.spell.materials);
    const castingTime = this.props.spell.castingTimeDescription
      ? this.props.spell.castingTime +
      ' ' +
      this.props.spell.castingTimeDescription
      : this.props.spell.castingTime;
    const range = this.props.spell.rangeDescription
      ? this.props.spell.range + ' ' + this.props.spell.rangeDescription
      : this.props.spell.range;

    const duration = this.props.spell.durationDescription
      ? this.props.spell.duration + ' ' + this.props.spell.durationDescription
      : this.props.spell.duration;

    return (
      <Grid celled="internally">
        <Grid.Row columns="1" textAlign="center">
          <Grid.Column>
            <div>
              <Header sub color="grey" size="tiny">
                {this.props.spell.name}
              </Header>
              <div>
                <i>{levelWithSchool}</i>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="2" textAlign="center">
          <Grid.Column>
            <div>
              <Header sub color="grey" size="tiny">
                Casting Time
                </Header>
              <div>{castingTime}</div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header sub color="grey" size="tiny">
                Range
                </Header>
              <div>{range}</div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="2" textAlign="center">
          <Grid.Column>
            <div>
              <Header sub color="grey" size="tiny">
                Components
                </Header>
              <div>
                {_.isEmpty(components) ? '-' : <span>{components}</span>}
              </div>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header sub color="grey" size="tiny">
                Duration
                </Header>
              <div>{duration}</div>
            </div>
          </Grid.Column>
        </Grid.Row>

        {_.isEmpty(materials) ? (
          ''
        ) : (
            <Grid.Row columns="1">
              <Grid.Column>
                <div style={{ textAlign: 'justify' }}>
                  <div>
                    <i>{materials}</i>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          )}

        <Grid.Row columns="1" textAlign="center">
          <Grid.Column>
            <div style={{ color: 'grey' }}>
              <i>{classes}</i>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  }
}

SpellMetaLayout.propTypes = {
  spell: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    castingTime: PropTypes.string.isRequired,
    castingTimeDescription: PropTypes.string.isRequired,
    classes: PropTypes.arrayOf(PropTypes.string).isRequired,
    components: PropTypes.arrayOf(PropTypes.string).isRequired,
    duration: PropTypes.string.isRequired,
    durationDescription: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    rangeDescription: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired
  }).isRequired
};

export default SpellMetaLayout;