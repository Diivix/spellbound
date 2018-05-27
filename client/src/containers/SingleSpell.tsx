import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Loader, Responsive, Segment } from 'semantic-ui-react';
import { getSpell } from '../actions/spells/spellsActions';
import SpellMetaLayout from '../components/SpellMetaLayout';
import { ISpell, IStoreState } from '../models';
import { isBusy } from '../selectors';

interface ISingleSpellStateProps {
  isBusy: boolean;
  spell: ISpell;
}

interface ISingleSpellDispatchProps {
  // tslint:disable-next-line:ban-types
  getSpell: Function;
}

interface IProps extends ISingleSpellStateProps, ISingleSpellDispatchProps {
  match: any;
}

class SingleSpellComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getSpell(this.props.match.params.id);
  }

  public render() {
    if (this.props.isBusy) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const spellName = _.upperFirst(this.props.spell.name);

    return (
      <div>
        <Header as="h1" color="grey">
          {spellName}
        </Header>
        <Grid as={Segment} celled="internally">
          <Grid.Row>
            <Responsive as={Grid.Column} width={5} minWidth={Responsive.onlyTablet.minWidth}>
              <SpellMetaLayout spell={this.props.spell} />
            </Responsive>
            <Grid.Column width={11}>
              <Header sub={true} color="grey" size="medium">
                Description
              </Header>
              <p>{this.props.spell.description}</p>

              {_.isEmpty(this.props.spell.atHigherLevels) ? (
                <div />
              ) : (
                <div>
                  <Header sub={true} color="grey" size="medium">
                    At Higher Levels
                  </Header>
                  <p>{this.props.spell.atHigherLevels}</p>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): ISingleSpellStateProps {
  return {
    isBusy: isBusy(state),
    spell: state.spellData.spellFromId
  };
}

function mapDispatchToProps(dispatch: any): ISingleSpellDispatchProps {
  return {
    getSpell: (id: string) => dispatch(getSpell(id))
  };
}

const SingleSpell = connect(mapStateToProps, mapDispatchToProps)(SingleSpellComponent);
export default SingleSpell;
