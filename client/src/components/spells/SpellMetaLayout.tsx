import _ from 'lodash';
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ISpell } from '../../models';

interface IProps {
  spell: ISpell;
}

class SpellMetaLayoutComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public buildCastingTimeValue = (castingTime: string, castingTimeDescription: string) => {
    if (castingTimeDescription) {
      castingTime = +' (' + castingTimeDescription + ')';
    }
    return castingTime;
  };

  public buildRangeValue = (range: string, rangeDescription: string) => {
    if (rangeDescription) {
      range += ' (' + rangeDescription + ')';
    }
    return range;
  };

  public buildLevelWithSchool = (level: number, school: string, truncateValue: boolean) => {
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

  public render() {
    const levelWithSchool = this.buildLevelWithSchool(this.props.spell.level, this.props.spell.school, false);
    const components = this.props.spell.components.map(component => _.upperCase(component)).join(', ');

    const classes = this.props.spell.classes.map(clss => _.capitalize(clss)).join(' · ');

    const castingTime = this.props.spell.castingTimeDescription
      ? this.props.spell.castingTime + ' ' + this.props.spell.castingTimeDescription
      : this.props.spell.castingTime;

    const range = this.props.spell.rangeDescription
      ? this.props.spell.range + ' ' + this.props.spell.rangeDescription
      : this.props.spell.range;

    const duration = this.props.spell.durationDescription
      ? this.props.spell.duration + ' ' + this.props.spell.durationDescription
      : this.props.spell.duration;

    let materialElement = <div />;
    if (!_.isEmpty(this.props.spell.materials)) {
      materialElement = (
        <Grid.Row columns="1">
          <Grid.Column textAlign="center">
                <i>{_.upperFirst(this.props.spell.materials)}.</i>
          </Grid.Column>
        </Grid.Row>
      );
    }

    return (
      <Grid celled="internally">
        <Grid.Row columns="1" textAlign="center">
          <Grid.Column>
              <Header sub={true} color="grey" size="tiny">
                {this.props.spell.name}
              </Header>
                <i>{levelWithSchool}</i>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="2" textAlign="center">
          <Grid.Column>
              <Header sub={true} color="grey" size="tiny">
                Casting Time
              </Header>
              {castingTime}
          </Grid.Column>
          <Grid.Column>
              <Header sub={true} color="grey" size="tiny">
                Range
              </Header>
              {range}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns="2" textAlign="center">
          <Grid.Column>
              <Header sub={true} color="grey" size="tiny">
                Components
              </Header>
              {_.isEmpty(components) ? '-' : <span>{components}</span>}
          </Grid.Column>
          <Grid.Column>
              <Header sub={true} color="grey" size="tiny">
                Duration
              </Header>
              {duration}
          </Grid.Column>
        </Grid.Row>

        {materialElement}

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

export default SpellMetaLayoutComponent;
