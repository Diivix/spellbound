const spellsData = [
  {
    id: 0,
    name: 'Fire Bolt',
    school: 'Destruction',
    level: 6,
    classes: ['Sorcerer', 'Wizard'],
    castingTime: '1',
    castingTimeDescription: 'Action',
    range: '20',
    rangeDescription: 'feet',
    components: ['V', 'S'],
    duration: 'action',
    durationDescription: '',
    description: '',
    atHigherLevels: ''
  },
  {
    id: 1,
    name: 'Ice Bolt',
    school: 'Destruction',
    level: 1,
    classes: ['Druid', 'Ranger', 'Wizard'],
    castingTime: 'Special',
    castingTimeDescription: '',
    range: 'Self',
    rangeDescription: '',
    components: ['V', 'S', 'M'],
    materials: 'water',
    duration: '1',
    durationDescription: 'action',
    description: '',
    atHigherLevels: ''
  },
  {
    id: 2,
    name: 'Lightning Bolt',
    school: 'Destruction',
    level: 0,
    classes: ['Sorcerer', 'Wizard'],
    castingTime: '1',
    castingTimeDescription: 'Action',
    range: '20',
    rangeDescription: 'feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    durationDescription: '',
    description: '',
    atHigherLevels: ''
  }
];
export default spellsData;
