import _ from 'lodash';
import { ICharacterBase } from 'models';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Button, Form, InputOnChangeData, Popup } from 'semantic-ui-react';
import { isUndefined } from 'util';

interface IProps {
  isCreate: boolean;
  trigger: JSX.Element;
  characterId?: string;
  name?: string;
  classType?: string;
  level?: number;
  description?: string;
  create?: (character: ICharacterBase) => {};
  update?: (character: { id: string } & ICharacterBase) => {};
  delete?: (charcterId: string) => void;
  isBusy: boolean;
}

interface IState {
  name?: string;
  classType?: string;
  level?: string;
  description?: string;
  isValidLevel: boolean;
  isValidName: boolean;
}

class CharacterEditablePopupComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      classType: this.props.classType,
      description: this.props.description,
      isValidLevel: true,
      isValidName: true,
      level: isUndefined(this.props.level) ? '' : this.props.level.toString(),
      name: this.props.name
    };
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData & { name: string }) => {
    switch (data.name) {
      case 'name':
        const isValidName = data.value !== '';
        this.setState({ name: data.value, isValidName });
        break;
      case 'class':
        this.setState({ classType: data.value });
        break;
      case 'level':
        let isValidLevel = true;
        if (data.value !== '') {
          const regex = RegExp('^[0-9]{1,2}$');
          isValidLevel = regex.test(data.value);
        }
        this.setState({ level: data.value, isValidLevel });
        break;
      case 'description':
        this.setState({ description: data.value });
        break;
      default:
        break;
    }
  };

  public handleSubmit = () => {
    if (this.props.isCreate && !isUndefined(this.props.create) && !isUndefined(this.state.name)) {
      const character: ICharacterBase = {
        classType: this.state.classType,
        description: this.state.description,
        level: Number(this.state.level),
        name: this.state.name
      };
      this.props.create(character);
    } else if (
      !this.props.isCreate &&
      !isUndefined(this.props.update) &&
      !isUndefined(this.props.characterId) &&
      !isUndefined(this.state.name)
    ) {
      const character: { id: string } & ICharacterBase = {
        classType: this.state.classType,
        description: this.state.description,
        id: this.props.characterId,
        level: Number(this.state.level),
        name: this.state.name
      };
      this.props.update(character);
    } else if (!this.props.isCreate && !isUndefined(this.props.delete) && !isUndefined(this.props.characterId)) {
      this.props.delete(this.props.characterId);
    }
  };

  public handleDelete = () => {
    if (!this.props.isCreate && !isUndefined(this.props.delete) && !isUndefined(this.props.characterId)) {
      this.props.delete(this.props.characterId);
    }
  };

  public render() {
    const characterName = _.capitalize(this.state.name);
    const characterClass = _.capitalize(this.state.classType);
    const characterLevel = this.state.level;
    const characterDescription = _.capitalize(this.state.description);
    const isValidForm = this.state.isValidLevel && this.state.isValidName;
    const buttonContent = this.props.isCreate ? 'Create' : 'Edit';

    return (
      <Popup trigger={this.props.trigger} on="focus" position="bottom center" hideOnScroll={true} flowing={true}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="name"
            label="Name"
            placeholder="Name"
            value={characterName}
            onChange={this.handleChange}
            error={!this.state.isValidName}
            required={true}
          />
          <Form.Input name="class" label="Class" placeholder="Class" value={characterClass} onChange={this.handleChange} />
          <Form.Input
            name="level"
            label="Level"
            placeholder="Level"
            value={characterLevel}
            onChange={this.handleChange}
            error={!this.state.isValidLevel}
          />
          <Form.Input
            name="description"
            label="Description"
            placeholder="Description"
            value={characterDescription}
            onChange={this.handleChange}
          />
          {/* TODO: make sure the buttons are on the same line. */}
          <Form.Group>
            <Form.Button type="submit" content={buttonContent} color="violet" disabled={!isValidForm} loading={this.props.isBusy} />
          </Form.Group>
        </Form>
        {!this.props.isCreate && (
          <Button content="Delete" negative={true} basic={true} floated="right" onClick={this.handleDelete} loading={this.props.isBusy} />
        )}
      </Popup>
    );
  }
}

export default CharacterEditablePopupComponent;
