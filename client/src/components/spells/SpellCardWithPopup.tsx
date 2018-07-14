import React from 'react';
import { Button, Grid, Popup } from 'semantic-ui-react';
import { ISpell } from '../../models';
import SpellCardComponent from './SpellCard';
import SpellMetaLayout from './SpellMetaLayout';

interface IProps {
  spell: ISpell;
  changeRoute: (path: string) => {};
}

interface IState {
  open: boolean;
}

class SpellCardWithPopupComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public changeRoute = () => {
    this.props.changeRoute('/spells/' + this.props.spell._id)
  }

  public render() {
    // Hacky workaround because Semantic UI has a bug when using a custom React component as the Popup trigger.
    const spellCard = (
      <div>
        <SpellCardComponent name={this.props.spell.name} level={this.props.spell.level} school={this.props.spell.school} />
      </div>
    );

    return (
      <Popup trigger={spellCard} on="focus" position="bottom center" hideOnScroll={true}>
        <SpellMetaLayout spell={this.props.spell} />

        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Button.Group fluid={true} size="mini">
                <Button basic={true} color="red" icon="heart outline" />
                <Button basic={true} color="blue" icon="users" />
                <Button basic={true} color="teal" icon="content" onClick={this.changeRoute} />
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Popup>
    );
  }
}

export default SpellCardWithPopupComponent;
