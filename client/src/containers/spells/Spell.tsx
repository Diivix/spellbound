import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Loader, Responsive, Segment } from 'semantic-ui-react';
import { isNullOrUndefined } from 'util';
import { getSpell } from '../../actions/spells/actions';
import SpellMetaLayout from '../../components/spells/SpellMetaLayout';
import { ISpell, IStoreState } from '../../models';
import { isBusy } from '../../selectors';

interface ISpellStateProps {
  isBusy: boolean;
  spell: ISpell | undefined;
}

interface ISpellDispatchProps {
  // tslint:disable-next-line:ban-types
  getSpell: Function;
}

interface IProps extends ISpellStateProps, ISpellDispatchProps {
  match: any;
}

class SpellComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getSpell(this.props.match.params.id);
  }

  public render() {
    // If busy, return immediatley.
    if (this.props.isBusy || isNullOrUndefined(this.props.spell)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const spellName = _.upperFirst(this.props.spell.name);
    const padding = { paddingTop: '10px' };

    const descriptionElement = (
      <div style={padding}>
        <Header sub={true} color="grey" size="medium">
          Description
        </Header>
        <p>{_.upperFirst(this.props.spell.description)}.</p>
      </div>
    );

    let materialElement = <div />;
    if (!_.isEmpty(this.props.spell.materials)) {
      materialElement = (
        <div style={padding}>
          <Header sub={true} color="grey" size="medium">
            Materials
          </Header>
          <p>{_.upperFirst(this.props.spell.materials)}.</p>
        </div>
      );
    }

    let atHigherLevelsElement = <div />;
    if (!_.isEmpty(this.props.spell.atHigherLevels)) {
      atHigherLevelsElement = (
        <div style={padding}>
          <Header sub={true} color="grey" size="medium">
            At Higher Levels
          </Header>
          <p>{_.upperFirst(this.props.spell.atHigherLevels)}.</p>
        </div>
      );
    }

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
              {descriptionElement}
              {materialElement}
              {atHigherLevelsElement}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: IStoreState): ISpellStateProps {
  return {
    isBusy: isBusy(state),
    spell: state.spellData.currentSpell
  };
}

function mapDispatchToProps(dispatch: any): ISpellDispatchProps {
  return {
    getSpell: (id: string) => dispatch(getSpell(id))
  };
}

const Spell = connect(mapStateToProps, mapDispatchToProps)(SpellComponent);
export default Spell;
