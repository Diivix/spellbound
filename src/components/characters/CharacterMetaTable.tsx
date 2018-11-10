import _ from 'lodash';
import * as React from 'react';
import { Table } from 'semantic-ui-react';

interface IProps {
  characterClass?: string;
  characterLevel?: number;
  characterDescription?: string;
}

class CharacterMetaTableComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const characterClass = _.capitalize(this.props.characterClass);
    const characterLevel = this.props.characterLevel;
    const characterDescription = _.capitalize(this.props.characterDescription);

    const centerContent = {
      display: 'flex',
      justifyContent: 'center'
    };

    return (
      <div style={centerContent}>
          <Table basic="very" columns="2" compact="very" collapsing={true}>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Class:
                </Table.Cell>
                <Table.Cell textAlign="left">{characterClass}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Level:
                </Table.Cell>
                <Table.Cell textAlign="left">{characterLevel}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="right" disabled={true}>
                  Description:
                </Table.Cell>
                <Table.Cell textAlign="left">{characterDescription}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
    );
  }
}

export default CharacterMetaTableComponent;
