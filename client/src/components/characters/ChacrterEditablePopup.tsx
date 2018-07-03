import _ from 'lodash';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ButtonProps, Form, InputOnChangeData, Popup } from 'semantic-ui-react';
import { isUndefined } from 'util';

interface IProps {
  isCreate: boolean;
  trigger: JSX.Element;
  characterId?: string;
  name?: string;
  classType?: string;
  level?: number;
  description?: string;
  create?: (name: string, classType?: string, level?: number, description?: string) => {};
  update?: (
    id: string,
    name?: string,
    classType?: string,
    level?: number,
    description?: string
  ) => {};
  delete?: (charcterId: string) => {};
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
      name: this.props.name,
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

  public handleSubmit = (event: any, data: ButtonProps) => {
    if (data.name === 'create' && !isUndefined(this.props.create) && !isUndefined(this.state.name)) {
      this.props.create(
        this.state.name,
        this.state.classType,
        Number(this.state.level),
        this.state.description
      );
    }
    if (data.name === 'edit' && !isUndefined(this.props.update) && !isUndefined(this.props.characterId)) {
      this.props.update(
        this.props.characterId,
        this.state.name,
        this.state.classType,
        Number(this.state.level),
        this.state.description
      );
    } else if (data.name === 'delete' && !isUndefined(this.props.delete) && !isUndefined(this.props.characterId)) {
      this.props.delete(this.props.characterId);
    }
  };

  public render() {
    const characterName = _.capitalize(this.state.name);
    const characterClass = _.capitalize(this.state.classType);
    const characterLevel = this.state.level;
    const characterDescription = _.capitalize(this.state.description);
    const isValidForm = this.state.isValidLevel && this.state.isValidName;

    return (
      <Popup trigger={this.props.trigger} on="focus" position="bottom center" hideOnScroll={true} flowing={true}>
        <Form>
          <Form.Input
            name="name"
            label="Name"
            placeholder="Name"
            value={characterName}
            onChange={this.handleChange}
            error={!this.state.isValidName}
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
          {this.props.isCreate ? (
            <Form.Button
              name="create"
              content="Create"
              floated="right"
              color="violet"
              onClick={this.handleSubmit}
              disabled={!isValidForm}
            />
          ) : (
            <Form.Group>
              <Form.Button name="edit" content="Edit" floated="right" color="violet" onClick={this.handleSubmit} disabled={!isValidForm} />
              <Form.Button name="delete" content="Delete" floated="right" color="red" basic={true} onClick={this.handleSubmit} />
            </Form.Group>
          )}
        </Form>
      </Popup>
    );
  }
}

export default CharacterEditablePopupComponent;
