import { ISpell } from '../models';
import ApiError from './ApiError';

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
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then((spell: ISpell) => {
      return spell;
    });
}

// GET
// Gets all spells
export function getSpells(token: string): Promise<ISpell[]> {
  const url: string = 'api/Spells';

  return fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then(response => response.json())
    .then((spells: ISpell[]) => {
      return spells;
    });
}
