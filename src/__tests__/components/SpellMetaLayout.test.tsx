import React from 'react';
import renderer from 'react-test-renderer';
import SpellMetaLayout from '../../components/spells/SpellMetaLayout';
import { ISpell } from '../../models';

test('Show Spell Metadata', () => {
  const spell: ISpell = {
    atHigherLevels: '',
    castingTime: '1 Action',
    classTypes: ['Sorcerer', 'Wizard'],
    components: ['V', 'S'],
    description: '',
    duration: 'action',
    id: "0",
    level: 6,
    name: 'Fire Bolt',
    range: '20 feet',
    reference: 'Page: 1 of Players Handbook',
    school: 'Destruction'
  }

  const component = renderer.create(
    <SpellMetaLayout spell={spell} />,
  );
  
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});