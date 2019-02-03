import { Button, Intent } from '@blueprintjs/core';
import _ from 'lodash';
import { ICharacter, ICharacterBase } from 'models';
import * as React from 'react';
import { isUndefined } from 'util';
import { avatar } from '../../assets/avatar';
import { BuildLevel } from '../../utils/ui';
import PopoverComponent from './CharacterPopover';

interface IProps {
  character: ICharacter;
  update?: (character: { id: number } & ICharacterBase) => {};
  delete?: (charcterId: number) => void;
  isBusy: boolean;
}

class CharacterDetailsComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const name = _.capitalize(this.props.character.name);
    const classType = isUndefined(this.props.character.classType) ? '' : _.capitalize(this.props.character.classType);
    const level = isUndefined(this.props.character.level) ? 0 : this.props.character.level;
    const description = _.capitalize(this.props.character.description);

    return (
      <div className="sb-grid sb-character-details">
        <div className="sb-row">
          <div className="sb-col sb-right-text">
            <img src={avatar} className="sb-avatar" />
          </div>
          <div className="sb-col sb-left-text">
            <h1 style={{ display: 'inline-block' }}>{name}</h1>
            <PopoverComponent
              key="createcharacter"
              isCreate={false}
              createOrUpdate={this.props.update}
              delete={this.delete}
              name={name}
              classType={classType}
              level={level}
              description={description}
            >
              <Button intent={Intent.WARNING} icon="edit" minimal={true} style={{ marginBottom: '10px' }} />
            </PopoverComponent>

            <h4>{BuildLevel(level, classType, false)}</h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }

  private delete = () => {
    if (!isUndefined(this.props.delete)) {
      this.props.delete(this.props.character.id);
    }
  };
}

export default CharacterDetailsComponent;
