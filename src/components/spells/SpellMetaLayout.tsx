import _ from 'lodash';
import React from 'react';
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
        <div className="sb-row">
          <div className="sb-col">
            <p className="center">
              <i>{_.upperFirst(spell.materials)}.</i>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="sb-physical-card">
        <div className="sb-row">
          <div className="sb-col">
            <h3>{spell.name}</h3>
            <i>{levelWithSchool}</i>
          </div>
        </div>

        <div className="sb-row">
          <div className="sb-col">
            <h3>Casting Time</h3>
            {castingTime}
          </div>
          <div className="sb-col">
            <h3>Range</h3>
            {range}
          </div>
        </div>

        <div className="sb-row">
          <div className="sb-col">
            <h3>Components</h3>
            {_.isEmpty(components) ? '-' : <span>{components}</span>}
          </div>
          <div className="sb-col">
            <h3>Duration</h3>
            {duration}
          </div>
        </div>

        {materialElement}

        <div className="sb-row">
          <div className="sb-col">
            <p className="grey">
              <i>{classTypes}</i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SpellMetaLayoutComponent;
