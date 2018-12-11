import { Button, Card, FormGroup, Icon, InputGroup, Intent, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { ICharacterBase } from 'models';
import React from 'react';

interface IProps {
  createCharacter: (character: ICharacterBase) => void;
}

interface IState {
  open: boolean;
  name: string;
  level: number;
  classType: string;
  description: string;
}

class CharacterAddPopoverComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      classType: '',
      description: '',
      level: 0,
      name: '',
      open: false
    };
  }

  public render() {
    const { name, level, classType, description } = this.state;
    return (
      <Popover>
        {/* Target */}
        <Card className="sb-item-card" interactive={true} style={{ textAlign: 'center' }}>
          <Icon icon={IconNames.ADD} iconSize={Icon.SIZE_LARGE} intent={Intent.PRIMARY} />
        </Card>

        {/* Content */}
        <div className="sb-character-popover-add">
          <form className="sb-character-popover-add_form">
            <FormGroup label="Name" labelFor="name-input" labelInfo="(required)">
              <InputGroup id="name-input" name="name" className="sb-character-popover-add_input" placeholder="Name" value={name} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup label="Level" labelFor="level-input">
              <InputGroup
                id="level-input"
                name="level"
                className="input"
                placeholder="Level"
                value={level.toString()}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup label="Class" labelFor="classType-input">
              <InputGroup
                id="classType-input"
                name="classType"
                className="input"
                placeholder="Class"
                value={classType}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup label="Description" labelFor="description-input">
              <InputGroup
                id="description-input"
                name="description"
                className="input"
                placeholder="Description"
                value={description}
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button className="sb-character-popover-add_button" icon="add" intent={Intent.PRIMARY} text="Add" onClick={this.handleSubmit} />
          </form>
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

  private handleSubmit = () => {
    const character: ICharacterBase = this.state;
    this.props.createCharacter(character);
  };
}

export default CharacterAddPopoverComponent;
