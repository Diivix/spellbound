import { Button, ButtonGroup, FormGroup, InputGroup, Intent, NumericInput, Popover } from '@blueprintjs/core';
import { ICharacterBase } from 'models';
import React from 'react';
import { isUndefined } from 'util';

interface IProps {
  name?: string;
  level?: number;
  classType?: string;
  description?: string;
  isCreate: boolean; // if not create, then is a popover for editing a character
  createOrUpdate?: (character: ICharacterBase) => void;
  delete?: () => void;
}

interface IState {
  open: boolean;
  name: string;
  level: number;
  classType?: string;
  description?: string;
}

class CharacterPopoverComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      classType: this.props.classType,
      description: this.props.description,
      level: isUndefined(this.props.level) ? 0 : this.props.level,
      name: isUndefined(this.props.name) ? '' : this.props.name,
      open: false
    };
  }

  public render() {
    const { name, level, classType, description } = this.state;
    return (
      <Popover>
        {/* Target */}
        {this.props.children}

        {/* Content */}
        <div className="sb-popover-content">
          <div className="sb-form">
            <FormGroup label="Name" labelFor="name-input" labelInfo="(required)">
              <InputGroup
                id="name-input"
                name="name"
                className="sb-character-popover-add_input"
                placeholder="Name"
                value={name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup label="Level" labelFor="level-input">
              <NumericInput id="level-input" name="level" placeholder="Level" value={level.toString()} onChange={this.handleChange} min={0} max={20} fill={true} />
            </FormGroup>

            <FormGroup label="Class" labelFor="classType-input">
              <InputGroup id="classType-input" name="classType" placeholder="Class" value={classType} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup label="Description" labelFor="description-input">
              <InputGroup
                id="description-input"
                name="description"
                placeholder="Description"
                value={description}
                onChange={this.handleChange}
              />
            </FormGroup>

            {this.props.isCreate ? (
              <ButtonGroup fill={true}>
                <Button icon="add" intent={Intent.PRIMARY} text="Add" onClick={this.handleSubmit(false)} />
              </ButtonGroup>
            ) : (
              <ButtonGroup fill={true}>
                <Button intent={Intent.WARNING} icon="edit" onClick={this.handleSubmit(false)} />
                <Button intent={Intent.DANGER} icon="delete" onClick={this.handleSubmit(true)} />
              </ButtonGroup>
            )}
          </div>
        </div>
      </Popover>
    );
  }

  private handleChange = (event: any) => {
    if (event.currentTarget.name === 'name') {
      this.setState({ name: event.currentTarget.value });
    } else if (event.currentTarget.name === 'level') {
      this.setState({ level: event.currentTarget.value });
    } else if (event.currentTarget.name === 'classType') {
      this.setState({ classType: event.currentTarget.value });
    } else if (event.currentTarget.name === 'description') {
      this.setState({ description: event.currentTarget.value });
    }
  };

  private handleSubmit = (isDelete: boolean = false) => (event: React.MouseEvent<HTMLElement>) => {
    if(isDelete && !isUndefined(this.props.delete)) {
      this.props.delete();
    }
    
    if(!isDelete && !isUndefined(this.props.createOrUpdate)) {
      // TODO: this needs to be an ICharacter with an ID for update requests.
      const character: ICharacterBase = this.state;
      this.props.createOrUpdate(character);
    }
  };
}

export default CharacterPopoverComponent;
