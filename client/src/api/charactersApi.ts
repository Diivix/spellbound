import { ICharacterBase, IUserData } from "models";

// CREATE
// Creates a new Character, from the current user
export function createCharacter(character: ICharacterBase): Promise<IUserData> {
  const url: string = '/api/users/characters/create';

  return fetch(url, {
    body: JSON.stringify(character),
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
    .then((newCharacter: IUserData) => {
      return newCharacter;
    });
}

// UPDATE
// Updates a Character, from the current user
export function updateCharacter(character: ICharacterBase): Promise<IUserData> {
  const url: string = '/api/users/characters/create';

  return fetch(url, {
    body: JSON.stringify(character),
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
    .then((updatedCharacter: IUserData) => {
      return updatedCharacter;
    });
}
