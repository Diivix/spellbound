import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { isUndefined } from 'util';
import { ICharacter, IStoreState } from '../../models';

// tslint:disable-next-line:no-empty-interface
interface IStateProps {}

interface IDispatchProps {
  changeRoute: (path: string) => {};
}

interface IProps extends IStateProps, IDispatchProps{
  character: ICharacter;
}

class CharacterCardComponet extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
  }

  public render() {
    const name = _.truncate(_.startCase(_.toLower(this.props.character.name)), { length: 20 });
    const spellCount = isUndefined(this.props.character.spells) ? 0 : this.props.character.spells.length;
    const url = "/characters/" + this.props.character.id;

    const cardStyle = { margin: '5px' };
    const headerStyle = { display: 'inline' };

    return (
      <Card style={cardStyle} href={url}>
        <Card.Content>
          <Image floated="left" size="mini" circular={true} src={require('../../assets/silhouette.png')} />
          <Card.Header style={headerStyle}>{name}</Card.Header>
          <Card.Meta textAlign="left"><Icon name="lightning" />{spellCount}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state: IStoreState): IStateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => {
  return {
    changeRoute: (path: string) => dispatch(push(path))
  };
};

const CharacterCard = connect(mapStateToProps, mapDispatchToProps)(CharacterCardComponet)
export default CharacterCard;
