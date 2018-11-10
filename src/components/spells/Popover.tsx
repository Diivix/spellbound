import { Button, ButtonGroup, Intent, Popover } from '@blueprintjs/core';
import React from 'react';
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

class PopoverComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public changeRoute = () => {
    this.props.changeRoute('/spells/' + this.props.spell.id);
  };

  public render() {
    return (
      <Popover>
        {/* Target */}
        <SpellCardComponent name={this.props.spell.name} level={this.props.spell.level} school={this.props.spell.school} />

        {/* Content */}
        <div style={{ width: '250px' }}>
          <SpellMetaLayout spell={this.props.spell} />
          <ButtonGroup large={true} fill={true} minimal={true}>
            <Button intent={Intent.DANGER} icon="heart" />
            <Button intent={Intent.PRIMARY} icon="people" />
            <Button intent={Intent.SUCCESS} icon="eye-open" onClick={this.changeRoute} />
          </ButtonGroup>
        </div>
      </Popover>
    );
  }
}

export default PopoverComponent;
