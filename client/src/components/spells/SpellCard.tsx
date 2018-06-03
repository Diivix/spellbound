import _ from 'lodash';
import React from 'react';
import { Card, Grid, Image, Popup } from 'semantic-ui-react';
import SpellButtons from '../../containers/spells/SpellButtons';
import { ISpell } from '../../models';
import SpellMetaLayout from './SpellMetaLayout';

interface IProps {
  spell: ISpell;
}

interface IState {
  open: boolean;
}

class SpellCardWithPopupComponent extends React.Component<IProps, IState> {
  public spellCard: JSX.Element;
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };

    const name = _.truncate(_.startCase(_.toLower(this.props.spell.name)), { length: 20 });

    const meta = this.buildLevelWithSchool(this.props.spell.level, this.props.spell.school, true);

    const cardStyle = { margin: '5px' };
    const headerStyle = { display: 'inline' };
    // Hacky workaround because Semantic UI has a bug when using a custom React component as the Popup trigger.
    this.spellCard = (
      <Card style={cardStyle}>
        <Card.Content>
          <Image floated="left" size="mini" src={require('../../assets/firespell.jpg')} />
          <Card.Header style={headerStyle}>{name}</Card.Header>
          <Card.Meta textAlign="left">{meta}</Card.Meta>
        </Card.Content>
      </Card>
    );

    this.buildLevelWithSchool = this.buildLevelWithSchool.bind(this);
  }

  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public buildLevelWithSchool = (level: number, school: string, truncateValue: boolean) => {
    school = _.upperFirst(school);

    let value;
    switch (level) {
      case 0:
        value = school + ' cantrip';
        break;
      case 1:
        value = level + 'st level ' + school;
        break;
      case 2:
        value = level + 'nd level ' + school;
        break;
      case 3:
        value = level + 'rd level ' + school;
        break;
      default:
        value = level + 'th level ' + school;
        break;
    }

    return (value = truncateValue ? _.truncate(value, { length: 20 }) : value);
  };

  public render() {
    return (
      <div>
        <Popup trigger={this.spellCard} on="focus" position="bottom center">
          <SpellMetaLayout spell={this.props.spell} />

          <Grid>
            <Grid.Row>
              <Grid.Column>
                <SpellButtons spellId={this.props.spell._id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Popup>
      </div>
    );
  }
}

export default SpellCardWithPopupComponent;
