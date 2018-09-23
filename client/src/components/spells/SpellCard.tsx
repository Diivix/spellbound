import _ from 'lodash';
import React from 'react';
import { Card } from 'semantic-ui-react';
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
      <Card style={{ margin: '5px' }} link={true}>
        <Card.Content>
          {icon}
          <Card.Header style={{ display: 'inline' }}>{name}</Card.Header>
          <Card.Meta style={{ paddingLeft: '22px' }} textAlign="left">
            {meta}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default SpellCardComponent;
