import { IFilters, ILightSpellsWithFilters, ISpell, ISpellId } from 'models';

// GET
// Gets a spell (full spell), from an id
export function getSpell(id: ISpellId): Promise<ISpell> {
  const url: string = '/api/spells/id/';

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
    .then((spell: ISpell) => {
      return spell;
    });
}

// GET
// Gets all spells with filters
export function getLightSpellsWithFilters(): Promise<ILightSpellsWithFilters> {
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
    .then((lightSpellsWithFilters: ILightSpellsWithFilters) => {
      return lightSpellsWithFilters;
    });
}

// POST
// Gets all spells with filters, from provided filters
export function getLightSpellsWithFiltersFromFilters(filters: IFilters): Promise<ILightSpellsWithFilters> {
  const url: string = '/api/spells/light/withfilters';
  // tslint:disable-next-line:no-console
  console.log(filters);

  return fetch(url, {
    body: JSON.stringify(filters),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    })
    .then(response => response.json())
    .then((lightSpellsWithFilters: ILightSpellsWithFilters) => {
      // tslint:disable-next-line:no-console
      console.log(lightSpellsWithFilters)
      return lightSpellsWithFilters;
    });
}
