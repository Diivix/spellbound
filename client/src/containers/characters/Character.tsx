import CompendiumMenu from 'components/CompendiumMenu';
import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Header, Image, Menu, Table } from 'semantic-ui-react';
import { isUndefined } from 'util';
import SpellCard from '../../components/spells/SpellCard';
import { ICharacter, IStoreState } from '../../models';
import { getCharacter } from '../../selectors';

interface ICharacterComponentStateProps {
  character: ICharacter;
}

interface ICharacterComponentDispatchProps {
  // tslint:disable-next-line:ban-types
  changeRoute: Function;
}

interface IProps extends ICharacterComponentStateProps, ICharacterComponentDispatchProps {
  match: any;
}

class CharacterCompoent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (isUndefined(this.props.character)) {
      this.props.changeRoute('/Error');
    }
  }

  public render() {
    const name = _.capitalize(this.props.character.name);
    const spellCards = isUndefined(this.props.character.spells)
      ? null
      : this.props.character.spells.map(spell => <SpellCard key={spell._id} name={spell.name} level={spell.level} school={spell.school} />);

    const centerContent = {
      display: 'flex',
      justifyContent: 'center'
    };

    return (
      <div>
        <Header as="h1" icon={true} textAlign="center">
          <Image circular={true} src={require('../../assets/silhouette.png')} />
          <Header.Content>{name}</Header.Content>
        </Header>

        <div style={centerContent}>
          <Table basic="very" columns="2" compact="very" collapsing={true}>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Class:
                </Table.Cell>
                <Table.Cell textAlign="left">Cleric</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Level:
                </Table.Cell>
                <Table.Cell textAlign="left">2</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Description:
                </Table.Cell>
                <Table.Cell textAlign="left">Some awesome charcter.</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <CompendiumMenu>
          <Menu.Item disabled={true} name="Equiped Spells" position="left" icon="lightning" />
        </CompendiumMenu>

        <Card.Group doubling={true} stackable={true} itemsPerRow={4}>
        {/* TODO: if null, insert picture */}
          {spellCards}
        </Card.Group>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState, props: IProps): ICharacterComponentStateProps {
  return {
    character: getCharacter(state, props.match.params.id)
  };
}

const mapDispatchToProps = (dispatch: any): ICharacterComponentDispatchProps => {
  return {
    changeRoute: (routeName: string) => dispatch(push(routeName))
  };
};

const Character = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCompoent);

export default Character;
