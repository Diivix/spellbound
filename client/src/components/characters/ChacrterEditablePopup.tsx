import _ from 'lodash';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ButtonProps, Form, InputOnChangeData, Popup } from 'semantic-ui-react';
import { isUndefined } from 'util';

interface IProps {
  isCreate: boolean;
  trigger: JSX.Element;
  characterId?: string;
  characterName?: string;
  characterClass?: string;
  characterLevel?: number;
  characterDescription?: string;
  create?: (characterName: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => {};
  edit?: (
    characterId: string,
    characterName?: string,
    characterClass?: string,
    characterLevel?: number,
    characterDescription?: string
  ) => {};
  delete?: (charcterId: string) => {};
}

interface IState {
  characterName?: string;
  characterClass?: string;
  characterLevel?: string;
  characterDescription?: string;
  isValidLevel: boolean;
  isValidName: boolean;
}

class CharacterEditablePopupComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      characterClass: this.props.characterClass,
      characterDescription: this.props.characterDescription,
      characterLevel: isUndefined(this.props.characterLevel) ? '' : this.props.characterLevel.toString(),
      characterName: this.props.characterName,
      isValidLevel: true,
      isValidName: true
    };
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData & { name: string }) => {
    switch (data.name) {
      case 'name':
        const isValidName = data.value !== '';
        this.setState({ characterName: data.value, isValidName });
        break;
      case 'class':
        this.setState({ characterClass: data.value });
        break;
      case 'level':
        let isValidLevel = true;
        if (data.value !== '') {
          const regex = RegExp('^[0-9]{1,2}$');
          isValidLevel = regex.test(data.value);
        }
        this.setState({ characterLevel: data.value, isValidLevel });
        break;
      case 'description':
        this.setState({ characterDescription: data.value });
        break;
      default:
        break;
    }
  };

  public handleSubmit = (event: any, data: ButtonProps) => {
    if (data.name === 'create' && !isUndefined(this.props.create) && !isUndefined(this.state.characterName)) {
      this.props.create(
        this.state.characterName,
        this.state.characterClass,
        Number(this.state.characterLevel),
        this.state.characterDescription
      );
    }
    if (data.name === 'edit' && !isUndefined(this.props.edit) && !isUndefined(this.props.characterId)) {
      this.props.edit(
        this.props.characterId,
        this.state.characterName,
        this.state.characterClass,
        Number(this.state.characterLevel),
        this.state.characterDescription
      );
    } else if (data.name === 'delete' && !isUndefined(this.props.delete) && !isUndefined(this.props.characterId)) {
      this.props.delete(this.props.characterId);
    }
  };

  public render() {
    const characterName = _.capitalize(this.state.characterName);
    const characterClass = _.capitalize(this.state.characterClass);
    const characterLevel = this.state.characterLevel;
    const characterDescription = _.capitalize(this.state.characterDescription);
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
