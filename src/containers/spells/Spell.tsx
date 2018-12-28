import { IBreadcrumbProps } from '@blueprintjs/core';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isNullOrUndefined } from 'util';
import { SetSpellIcon } from 'utils/ui';
import { getSpell } from '../../actions/spells/actions';
import BreadcrumbsComponent from '../../components/Breadcrumbs';
import { Loader } from '../../components/loader/Loader';
import SpellMetaLayout from '../../components/spells/SpellMetaLayout';
import { ISpell, IStoreState } from '../../models';
import { isBusy } from '../../selectors';

interface ISpellStateProps {
  isBusy: boolean;
  spell: ISpell | undefined;
}

interface ISpellDispatchProps {
  changeRoute: (path: string) => {};
  getSpell: (id: string) => {};
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
      return <Loader />;
    }

    const breadcrumbs: IBreadcrumbProps[] = [{ onClick: this.changeRoute, text: 'Spells' }, { text: _.startCase(spell.name) }];
    const spellName = _.startCase(spell.name);
    const icon = SetSpellIcon(spell.school);
    const paddingStyle = { paddingTop: '10px', paddingBottom: '10px' };

    const descriptionElement = (
      <div style={paddingStyle}>
        <h3>Description</h3>
        <p>{_.upperFirst(spell.description)}.</p>
      </div>
    );

    const materialElement = !_.isEmpty(spell.materials) ? (
      <div style={paddingStyle}>
        <h3>Materials</h3>
        <p>{_.upperFirst(spell.materials)}.</p>
      </div>
    ) : null;

    const atHigherLevelsElement = !_.isEmpty(spell.atHigherLevels) ? (
      <div style={paddingStyle}>
        <h3>At Higher Levels</h3>
        <p>{_.upperFirst(spell.atHigherLevels)}.</p>
      </div>
    ) : null;

    const referenceElement = (
      <div style={paddingStyle}>
        <h3>Reference</h3>
        <p>{_.upperFirst(spell.reference)}.</p>
      </div>
    );

    return (
      <div className="sb-container">
        <BreadcrumbsComponent items={breadcrumbs} />
        <div className="sb-center-text">
          <h1>
            {icon}
            {spellName}
          </h1>
        </div>
        <div className="sb-grid sb-celled-internally sb-center-h">
          <div className="sb-row">
            <div className="sb-col" style={{ maxWidth: '250px' }}>
              <SpellMetaLayout spell={spell} />
            </div>
            <div className="sb-col" style={{ maxWidth: '600px' }}>
              {descriptionElement}
              {materialElement}
              {atHigherLevelsElement}
              {referenceElement}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private changeRoute = () => {
    this.props.changeRoute('/spells');
  };
}

function mapStateToProps(state: IStoreState): ISpellStateProps {
  return {
    isBusy: isBusy(state),
    spell: state.spellData.currentSpell
  };
}

function mapDispatchToProps(dispatch: any): ISpellDispatchProps {
  return {
    changeRoute: (path: string) => dispatch(push(path)),
    getSpell: (id: string) => dispatch(getSpell(id))
  };
}

const Spell = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpellComponent);
export default Spell;
