import { Card } from "@blueprintjs/core";
import _ from 'lodash';
import React from 'react';
import { BuildLevel, SetSpellIcon } from '../../utils/ui';

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
    const meta = BuildLevel(this.props.level, this.props.school, true);
    const icon = SetSpellIcon(this.props.school)

    return (
      <Card className="sb-card" interactive={true}>
        {icon}
        <h5 className="sb-card_heading">{name}</h5>
        <p className="sb-card_meta">{meta}</p>
      </Card>
    );
  }
}

export default SpellCardComponent;
