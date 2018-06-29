import React from 'react';
import { Grid, Popup } from 'semantic-ui-react';
import SpellButtons from '../../containers/spells/SpellButtons';
import { ISpell } from '../../models';
import SpellCardComponent from './SpellCard';
import SpellMetaLayout from './SpellMetaLayout';

interface IProps {
  spell: ISpell;
}

interface IState {
  open: boolean;
}

class SpellCardWithPopupComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    // Hacky workaround because Semantic UI has a bug when using a custom React component as the Popup trigger.
    const spellCard = <div><SpellCardComponent name={this.props.spell.name} level={this.props.spell.level} school={this.props.spell.school} /></div>;

    return (
      <div>
        <Popup trigger={spellCard} on="focus" position="bottom center" hideOnScroll={true}>
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
