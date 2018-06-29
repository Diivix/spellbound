import _ from 'lodash';
import * as React from 'react';
import { SyntheticEvent } from 'react';
import { Form, InputOnChangeData } from 'semantic-ui-react';
import { isUndefined } from 'util';

// interface ICharacterEditableComponentStateProps {
//   character: ICharacter;
// }

// interface ICharacterEditableComponentDispatchProps {
//   // tslint:disable-next-line:ban-types
//   changeRoute: Function;
// }

// interface IProps extends ICharacterEditableComponentStateProps, ICharacterEditableComponentDispatchProps { }
interface IProps {
  characterName?: string;
  characterClass?: string;
  characterLevel?: string;
  characterDescription?: string;
}

interface IState {
  characterName?: string;
  characterClass?: string;
  characterLevel?: string;
  characterDescription?: string;
}

class CharacterEditableComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      characterClass: isUndefined(this.props.characterClass) ? '' : _.capitalize(this.props.characterClass),
      characterDescription: isUndefined(this.props.characterDescription) ? '' : _.capitalize(this.props.characterDescription),
      characterLevel: isUndefined(this.props.characterLevel) ? '' : this.props.characterLevel,
      characterName: isUndefined(this.props.characterName) ? '' : _.capitalize(this.props.characterName)
    };
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
  };

  public handleSubmit = () => {
    alert('Hello!');
  };

  public render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input name="name" label="Name" placeholder="Name" value={this.state.characterName} onChange={this.handleChange} />
          <Form.Input name="class" label="Class" placeholder="Class" value={this.state.characterClass} onChange={this.handleChange} />
          <Form.Input name="level" label="Level" placeholder="Level" value={this.state.characterLevel} onChange={this.handleChange} />
          <Form.Input
            name="description"
            abel="Description"
            placeholder="Description"
            value={this.state.characterDescription}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" floated="right" color="violet"/>
        </Form>
      </div>
    );
  }
}

// function mapStateToProps(state: IStoreState, props: IProps): ICharacterEditableComponentStateProps {
//   return {
//     character: getCharacter(state, props.match.params.id)
//   };
// }

// const mapDispatchToProps = (dispatch: any): ICharacterEditableComponentDispatchProps => {
//   return {
//     changeRoute: (routeName: string) => dispatch(push(routeName))
//   };
// };

// const CharacterEditable = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CharacterEditableComponent);

export default CharacterEditableComponent;
