import { Card } from '@blueprintjs/core';
import _ from 'lodash';
import React from 'react';
import { isNullOrUndefined } from 'util';
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
    const level = this.props.character.level;
    const spells = isNullOrUndefined(this.props.character.spells) ? 0 : this.props.character.spells.length;
    const icon = <i className="sb-card_icon ra ra-level-three-advanced ra-lg" style={{ color: '#1089ed' }} />;

    return (
      <Card className="sb-card" interactive={true} onClick={this.handleClick}>
        {icon}
        <h5 className="sb-card_heading">{name}</h5>
        <p className="sb-card_meta">
          Level: {level}, Spells: {spells}
        </p>
      </Card>
    );
  }

  private handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    this.props.changeRoute(this.props.character.id);
  };
}

export default CharacterCardComponent;
