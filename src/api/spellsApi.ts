import { ISpell } from '../models';
import ApiError from './ApiError';

// GET
// Gets a spell (full spell), from an id
export function getSpell(id: string, token: string): Promise<ISpell> {
  const url: string = process.env.REACT_APP_API_URL + '/api/spells/' + id;

  return fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
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
export function getSpells(partial: boolean = false, token: string): Promise<ISpell[]> {
  const url: string = process.env.REACT_APP_API_URL + '/api/Spells?partial=' + partial;

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
