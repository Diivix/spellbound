import { Button, ButtonGroup, IconName, Intent, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { isUndefined } from 'util';
import { ICharacterSimple, ISpell } from '../../models';
import SpellCardComponent from './SpellCard';
import SpellMetaLayout from './SpellMetaLayout';

interface IProps {
  changeRoute: (path: string) => {};
  characters: ICharacterSimple[] | undefined;
  spell: ISpell;
  addSpellToCharacter: (characterId: number, spellId: number) => void;
  removeSpellFromCharacter: (characterId: number, spellId: number) => void;
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
        <div className="sb-popover-content">
          <SpellMetaLayout spell={this.props.spell}/>
          <ButtonGroup large={true} fill={true} minimal={true}>
            <Popover content={this.renderCharacterMenu()} className="sb-button-group_popover" targetClassName="sb-button-group_popover-target">
              <Button intent={Intent.PRIMARY} icon="people" />
            </Popover>

            <Button intent={Intent.SUCCESS} icon="eye-open" onClick={this.changeRoute} />
          </ButtonGroup>
        </div>
      </Popover>
    );
  }

  private renderCharacterMenu = () => {
  const menuItems = isUndefined(this.props.characters) ? null : this.props.characters.map(x => {
    let intent: Intent = Intent.NONE;
    let icon: IconName = IconNames.NEW_PERSON;
    let onClick = this.addSpellToCharacter(x.id, this.props.spell.id);
    if(x.spellIds.find(s => s === this.props.spell.id)) {
      intent = Intent.DANGER;
      icon = IconNames.BLOCKED_PERSON;
      onClick = this.removeSpellFromCharacter(x.id, this.props.spell.id)
    }
    return <MenuItem key={x.id} icon={icon} text={x.name} intent={intent} onClick={onClick}/>
  })

    return (
      <Menu>
        {menuItems}
      </Menu>
    );
  }

  private addSpellToCharacter = (characterId: number, spellId: number) => (event: React.MouseEvent<HTMLElement>) => {
    this.props.addSpellToCharacter(characterId, spellId)
  }

  private removeSpellFromCharacter = (characterId: number, spellId: number) => (event: React.MouseEvent<HTMLElement>) => {
    this.props.removeSpellFromCharacter(characterId, spellId)
  }
}

export default PopoverComponent;
