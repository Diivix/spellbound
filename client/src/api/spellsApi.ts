import { IFilters, ISpell } from 'models';

// GET
// Gets a spell (full spell), from an id
export function getSpell(id: string): Promise<ISpell> {
  const url: string = '/api/spells/id/' + id;

  return fetch(url, {
    credentials: 'include',
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((spell: ISpell) => {
      return spell;
    });
}

// GET
// Gets all spells with filters
export function getLightSpellsWithFilters(): Promise<{ spells: ISpell[]; filters: IFilters }> {
  const url: string = '/api/spells/light/withfilters';

  return fetch(url, {
    credentials: 'include',
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    })
    .then(response => response.json())
    .then((lightSpellsWithFilters: { spells: ISpell[]; filters: IFilters }) => {
      return lightSpellsWithFilters;
    });
}

// POST
// Gets all spells with filters, from provided filters
export function getLightSpellsWithFiltersFromFilters(filters: IFilters): Promise<{ spells: ISpell[]; filters: IFilters }> {
  const url: string = '/api/spells/light/withfilters';

  return fetch(url, {
    body: JSON.stringify(filters),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => response.json())
}
