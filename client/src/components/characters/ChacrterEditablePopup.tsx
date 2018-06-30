import _ from 'lodash';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, InputOnChangeData, Popup } from 'semantic-ui-react';
import { isUndefined } from 'util';

interface IProps {
  trigger: JSX.Element;
  characterName?: string;
  characterClass?: string;
  characterLevel?: number;
  characterDescription?: string;
  submit: (characterName?: string, characterClass?: string, characterLevel?: number, characterDescription?: string) => {};
}

interface IState {
  characterName?: string;
  characterClass?: string;
  characterLevel?: string;
  characterDescription?: string;
  isValid: boolean;
}

class CharacterEditablePopupComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      characterClass: this.props.characterClass,
      characterDescription: this.props.characterDescription,
      characterLevel: isUndefined(this.props.characterLevel) ? '' : this.props.characterLevel.toString(),
      characterName: this.props.characterName,
      isValid: true
    };
  }

  public handleChange = (e: SyntheticEvent<any>, data: InputOnChangeData & { name: string }) => {
    switch (data.name) {
      case "name":
        this.setState({ characterName: data.value });
        break;
      case "class":
        this.setState({ characterClass: data.value });
        break;
      case "level":
        const parsed = parseInt(data.value, 10);
        if(!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
          this.setState({ characterLevel: data.value, isValid: true });
        } else {
          this.setState({ characterLevel: data.value, isValid: false });
        }
        break;
      case "description":
        this.setState({ characterDescription: data.value });
        break;
      default:
        break;
    }
  };

  public handleSubmit = () => {
    this.props.submit(this.state.characterName, this.state.characterClass, Number(this.state.characterLevel), this.state.characterDescription);
  };

  public render() {
    const characterName = _.capitalize(this.state.characterName);
    const characterClass = _.capitalize(this.state.characterClass);
    const characterLevel = this.state.characterLevel;
    const characterDescription = _.capitalize(this.state.characterDescription);

    return (
      <Popup trigger={this.props.trigger} on="focus" position="bottom center" hideOnScroll={true} flowing={true}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name="name" label="Name" placeholder="Name" value={characterName} onChange={this.handleChange} />
          <Form.Input name="class" label="Class" placeholder="Class" value={characterClass} onChange={this.handleChange} />
          <Form.Input
            name="level"
            label="Level"
            placeholder="Level"
            value={characterLevel}
            onChange={this.handleChange}
            error={!this.state.isValid}
          />
          <Form.Input
            name="description"
            label="Description"
            placeholder="Description"
            value={characterDescription}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" floated="right" color="violet" disabled={!this.state.isValid} />
        </Form>
      </Popup>
    );
  }
}

export default CharacterEditablePopupComponent;
