import { Card, H5 } from "@blueprintjs/core";
import _ from 'lodash';
import React from 'react';
// import { Card } from 'semantic-ui-react';
import { BuildLevelWithSchool, SetSpellIcon } from '../../utils/ui';

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
      <Card style={{margin: '5px'}} interactive={true}>
        {icon}
        <H5 style={{ display: 'inline' }}>{name}</H5>
        <p style={{ paddingLeft: '23px' }}>{meta}</p>
      </Card>
    );
  }
}

export default SpellCardComponent;
