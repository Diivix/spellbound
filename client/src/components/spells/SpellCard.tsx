import { Card } from "@blueprintjs/core";
import _ from 'lodash';
import React from 'react';
import { BuildLevelWithSchool, SetSpellIcon } from '../../utils/ui';
import './SpellCard.css'

interface IProps {
  name: string;
  level: number;
  school: string;
}

class SpellCardComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.name)), { length: 20 });
    const meta = BuildLevelWithSchool(this.props.level, this.props.school, true);
    const icon = SetSpellIcon(this.props.school, '#2ab5ab')

    return (
      <Card className="card" interactive={true}>
        {icon}
        <h5 className="heading">{name}</h5>
        <p className="meta">{meta}</p>
      </Card>
    );
  }
}

export default SpellCardComponent;
