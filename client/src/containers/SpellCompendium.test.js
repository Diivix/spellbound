import React from 'react';
import SpellCardWithPopup from '../presentation/SpellCard'
import renderer from 'react-test-renderer';
import spellsData from '../../utils/spells.data.js';

// Snapshot test
test('Snapshot test for SpellCard', () => {

    const spellCards = spellsData.map(spell => (
        <SpellCardWithPopup key={spell.id} spell={spell} />
    ));

    const component = renderer.create(
        Array.from(spellCards)
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    // tree.props.open = true;
    // // re-renderingq
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();

    // // manually trigger the callback
    // tree.props.onMouseLeave();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});