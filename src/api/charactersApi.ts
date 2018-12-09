import { ICharacter, ICharacterBase } from 'models';
import ApiError from './ApiError';

// GET
// Gets the characters for the current user
export function getCharacters(token: string): Promise<ICharacter[]> {
  const url: string = '/api/characters/user';

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
    .then((characters: ICharacter[]) => {
      return characters;
    });
}

// CREATE
// Creates a new Character, from the current user
export function createCharacter(character: ICharacterBase, token: string): Promise<ICharacter> {
  const url: string = '/api/characters';

  return fetch(url, {
    body: JSON.stringify(character),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(response.json()));
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then((newCharacter: ICharacter) => {
      // tslint:disable-next-line:no-console
      console.log("We got here 2...");
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(newCharacter));
      return newCharacter;
    });
}

// UPDATE
// Updates a Character, from the current user
export function updateCharacter(character: { id: number } & ICharacterBase, token: string): Promise<ICharacter> {
  const url: string = '/api/users/characters/update';

  return fetch(url, {
    body: JSON.stringify(character),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then(response => response.json())
    .then((updatedCharacter: ICharacter) => {
      return updatedCharacter;
    });
}

// DELETE
// Deletes a Character, from the current user
export function deleteCharacter(characterId: { characterId: number }, token: string): Promise<void> {
  const url: string = '/api/users/characters/delete';

  return fetch(url, {
    body: JSON.stringify(characterId),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  })
    .then(response => {
      if (response.status !== 200) {
        throw new ApiError(response.status, response.statusText);
      }
    });
}
