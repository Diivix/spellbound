import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Loader, Responsive } from 'semantic-ui-react';
import { isNullOrUndefined } from 'util';
import { SetSpellIcon } from 'utils/ui';
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
    const { spell } = this.props;

    // If busy, return immediatley.
    if (this.props.isBusy || isNullOrUndefined(spell)) {
      return <Loader active={true} inline="centered" size="big" />;
    }

    const spellName = _.upperCase(spell.name);
    const icon = SetSpellIcon(spell.school, '#2ab5ab');
    const paddingStyle = { paddingTop: '10px' };

    const descriptionElement = (
      <div style={paddingStyle}>
        <Header sub={true} color="grey" size="medium">
          Description
        </Header>
        <p>{_.upperFirst(spell.description)}.</p>
      </div>
    );

    const materialElement = !_.isEmpty(spell.materials) ? (
      <div style={paddingStyle}>
        <Header sub={true} color="grey" size="medium">
          Materials
        </Header>
        <p>{_.upperFirst(spell.materials)}.</p>
      </div>
    ) : null;

    const atHigherLevelsElement = !_.isEmpty(spell.atHigherLevels) ? (
      <div style={paddingStyle}>
        <Header sub={true} color="grey" size="medium">
          At Higher Levels
        </Header>
        <p>{_.upperFirst(spell.atHigherLevels)}.</p>
      </div>
    ) : null;

    return (
      <div>
        <div style={{ textAlign: 'center', paddingBottom: '30px' }}>
          <Header as="h1" color="grey">
            {icon}
            {spellName}
          </Header>
        </div>
        <Grid celled="internally">
          <Grid.Row>
            <Responsive as={Grid.Column} width={5} minWidth={Responsive.onlyTablet.minWidth}>
              <SpellMetaLayout spell={spell} />
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

const Spell = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellComponent);
export default Spell;
