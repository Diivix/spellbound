import _ from 'lodash';
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { BuildLevelWithSchool } from 'utils/ui';
import { ISpell } from '../../models';

interface IProps {
  spell: ISpell;
}

class SpellMetaLayoutComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { spell } = this.props;
    const levelWithSchool = BuildLevelWithSchool(spell.level, spell.school, false);
    const components = spell.components.map(component => _.upperCase(component)).join(', ');
    const classTypes = spell.classTypes.map(clss => _.capitalize(clss)).join(' · ');
    const castingTime = spell.castingTime;
    const range = spell.range;
    const duration = spell.duration;

    let materialElement = <div />;
    if (!_.isEmpty(spell.materials)) {
      materialElement = (
        <Grid.Row columns="1">
          <Grid.Column textAlign="center">
            <i>{_.upperFirst(spell.materials)}.</i>
          </Grid.Column>
        </Grid.Row>
      );
    }

    return (
      <Grid celled="internally">
        <Grid.Row columns="1" textAlign="center">
          <Grid.Column>
            <Header sub={true} color="grey" size="tiny">
              {spell.name}
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
              <i>{classTypes}</i>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SpellMetaLayoutComponent;
