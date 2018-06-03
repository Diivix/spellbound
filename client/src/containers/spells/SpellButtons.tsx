import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'semantic-ui-react';
import { IStoreState } from '../../models';
// import SpellModal from '../components/SpellModal';
// import { IStoreState } from '../models';

// tslint:disable-next-line:no-empty-interface
interface ISpellButtonsStateProps {}

interface ISpellButtonsDispatchProps {
  // tslint:disable-next-line:ban-types
  changeRoute: Function;
}

interface IProps extends ISpellButtonsStateProps, ISpellButtonsDispatchProps {
  spellId: string;
}

class SpellButtonsComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
  }

  // public toggleModal = () => {
  //   this.setState({ open: !this.state.open });
  // };

  // public closeModal = () => {
  //   this.setState({ open: false });
  // };

  public changeRoute = () => {
    this.props.changeRoute('/spells/' + this.props.spellId);
  };

  public render() {
    return (
      <div>
        <Button.Group fluid={true} size="mini">
          <Button basic={true} color="red" icon="empty heart" />
          <Button basic={true} color="blue" icon="users" />
          <Button basic={true} color="teal" icon="content" onClick={this.changeRoute} />
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
  return {};
};

const mapDispatchToProps = (dispatch: any): ISpellButtonsDispatchProps => {
  return {
    // getSpell: (spellId: string) => dispatch(getSpell(spellId))
    changeRoute: (routeName: string) => dispatch(push(routeName))
  };
};

const SpellButtons = connect(mapStateToProps, mapDispatchToProps)(SpellButtonsComponent);

export default SpellButtons;
