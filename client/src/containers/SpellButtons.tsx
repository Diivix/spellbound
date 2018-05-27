import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { getSpell } from '../actions/spells/spellsActions';
// import SpellModal from '../components/SpellModal';
import { ISpell, IStoreState } from '../models';
import { isBusy } from '../selectors';

interface ISpellButtonsStateProps {
  spell: ISpell;
  isBusy: boolean;
}

interface ISpellButtonsDispatchProps {
  // tslint:disable-next-line:ban-types
  getSpell: Function;
}

interface IProps extends ISpellButtonsStateProps, ISpellButtonsDispatchProps {
  spellId: string;
}

interface IState {
  open: boolean;
}

class SpellButtonsComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
  }

  public toggleModal = () => {
    this.setState({ open: !this.state.open });
  };

  public closeModal = () => {
    this.setState({ open: false });
  };

  public getSpell = () => {
    this.props.getSpell(this.props.spellId);
  };

  public render() {
    return (
      <div>
        <Button.Group fluid={true} size="mini">
          <Button basic={true} color="red" icon="empty heart" />
          <Button basic={true} color="blue" icon="users" />
          <Button basic={true} color="teal" icon="content" onClick={this.getSpell} />
        </Button.Group>

        {/* {this.state.open ? (
          <SpellModal
            show={this.state.open}
            onClose={this.closeModal}
            isBusy={this.props.isBusy}
            fetchSpell={this.getSpell}
            spell={this.props.spell}
          />
        ) : (
          <div />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState): ISpellButtonsStateProps => {
  return {
    isBusy: isBusy(state),
    spell: state.spellData.spellFromId
  };
};

const mapDispatchToProps = (dispatch: any): ISpellButtonsDispatchProps => {
  return {
    getSpell: (spellId: string) => dispatch(getSpell(spellId))
  };
};

const SpellButtons = connect(mapStateToProps, mapDispatchToProps)(SpellButtonsComponent);

export default SpellButtons;
