import _ from 'lodash';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { ButtonProps, Form, InputOnChangeData, Popup } from 'semantic-ui-react';
import { isNullOrUndefined, isUndefined } from 'util';

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
    characterId?: string,
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

    this.validateForm();
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData & { name: string }) => {
    switch (data.name) {
      case 'name':
        this.setState({ characterName: data.value });
        break;
      case 'class':
        this.setState({ characterClass: data.value });
        break;
      case 'level':
        this.setState({ characterLevel: data.value });
        break;
      case 'description':
        this.setState({ characterDescription: data.value });
        break;
      default:
        break;
    }

    this.validateForm();
  };

  public handleSubmit = (event: any, data: ButtonProps) => {
    if (data.name === 'create') {
      // TODO: Fix this.
      alert('create or edit');
    }
    if (data.name === 'edit') {
      // TODO: Fix this.
      alert('create or edit');
    } else if (data.name === 'delete' && !isUndefined(this.props.delete) && !isUndefined(this.props.characterId)) {
      this.props.delete(this.props.characterId);
    }
  };

  // TODO: Broken :(
  public validateForm = () => {
    const isValidName = this.state.characterName !== '' || isNullOrUndefined(this.state.characterName);

    let isValidLevel = true;
    if (!isUndefined(this.state.characterLevel)) {
      const regex = RegExp('^[0-9]{1,2}$');
      isValidLevel = regex.test(this.state.characterLevel);
    } else if (this.state.characterLevel === '') {
      isValidLevel = true;
    }

    this.setState({ isValidName, isValidLevel });
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
