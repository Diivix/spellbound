import { Card, Elevation, Icon } from '@blueprintjs/core';
import _ from 'lodash';
import { ICharacterBase } from 'models';
import * as React from 'react';

interface IProps {
  classType?: string;
  description?: string;
  level?: number;
  name: string;
  create?: (character: ICharacterBase) => {};
  updateMeta?: (character: { id: number } & ICharacterBase) => {};
  delete?: (charcterId: number) => void;
  isBusy: boolean;
}

class CharacterDetailsComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const name = _.capitalize(this.props.name);
    const classType = _.capitalize(this.props.classType);
    const level = this.props.level;
    const description = _.capitalize(this.props.description);

    return (
      <Card className="sb-character-card" elevation={Elevation.THREE}>
        <h2>{name}</h2>
        <div>
          <Icon icon="arrow-top-right" /> {level} <Icon icon="person" /> {classType}
          <p>{description}</p>
        </div>
      </Card>
    );
  }
}

export default CharacterDetailsComponent;
