import { ICharacterBase, IUserData } from 'models';

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
export function updateCharacter(character: { id: string } & ICharacterBase): Promise<IUserData> {
  const url: string = '/api/users/characters/update';

  return fetch(url, {
    body: JSON.stringify(character),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
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

// DELETE
// Deletes a Character, from the current user
export function deleteCharacter(characterId: string): Promise<IUserData> {
  const url: string = '/api/users/characters/delete';

  return fetch(url, {
    body: JSON.stringify(characterId),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
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
