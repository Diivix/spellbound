import _ from 'lodash';
import { ICharacterBase } from 'models';
import * as React from 'react';
import { isUndefined } from 'util';
import { avatar } from '../../assets/avatar';
import { BuildLevel } from '../../utils/ui';

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
    const classType = isUndefined(this.props.classType) ? '' : _.capitalize(this.props.classType);
    const level = isUndefined(this.props.level) ? 0 : this.props.level;
    const description = _.capitalize(this.props.description);

    return (
      <div className="sb-grid sb-character-details">
        <div className="sb-row">
          <div className="sb-col sb-right-text">
            <img src={avatar} className="sb-avatar" />
          </div>
          <div className="sb-col sb-left-text">
            <h1>{name}</h1>
            <h4>{BuildLevel(level, classType, false)}</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterDetailsComponent;
