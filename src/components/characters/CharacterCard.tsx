import { Card, Icon } from '@blueprintjs/core';
import _ from 'lodash';
import React from 'react';
import { isUndefined } from 'util';
import { BuildLevel } from 'utils/ui';
import { ICharacter } from '../../models';

interface IProps {
  changeRoute: (id: number) => void;
  character: ICharacter;
}

class CharacterCardComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
  }

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.character.name)), { length: 20 });
    const classType = isUndefined(this.props.character.classType) ? "" : _.capitalize(this.props.character.classType);
    const level = isUndefined(this.props.character.level) ? 0 : this.props.character.level;
    const icon = <Icon icon="person" className="sb-colour-blue" style={{ paddingRight: '5px' }} />;

    return (
      <Card className="sb-card" interactive={true} onClick={this.handleClick}>
        {icon}
        <h5 className="sb-card_heading">{name}</h5>
        <p className="sb-card_meta">
          {BuildLevel(level, classType, false)}
        </p>
      </Card>
    );
  }

  private handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    this.props.changeRoute(this.props.character.id);
  };
}

export default CharacterCardComponent;
