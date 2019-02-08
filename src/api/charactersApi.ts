import { ICharacter, ICharacterBase } from 'models';
import ApiError from './ApiError';

// GET
// Gets the characters for the current user
export function getCharacters(token: string): Promise<ICharacter[]> {
  const url: string = process.env.REACT_APP_API_URL + '/api/characters/user';

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
  const url: string = process.env.REACT_APP_API_URL + '/api/characters';

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
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then((newCharacter: ICharacter) => {
      return newCharacter;
    });
}

// UPDATE
// Updates a Character, from the current user
export function updateCharacterMeta(character: { id: number } & ICharacterBase, token: string): Promise<ICharacter> {
  const url: string = process.env.REACT_APP_API_URL + '/api/characters';

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
  const url: string = process.env.REACT_APP_API_URL + '/api/users/characters/delete';

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

// ADD SPELL
// Adds a spell to a character
export function addSpell(characterAndSpellId: { characterId: number, spellId: number }, token: string): Promise<ICharacter> {
  const url: string = process.env.REACT_APP_API_URL + '/api/characters/addspell';

  return fetch(url, {
    body: JSON.stringify(characterAndSpellId),
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

// REMOVE SPELL
// Removes a spell to a character
export function removeSpell(characterAndSpellId: { characterId: number, spellId: number }, token: string): Promise<ICharacter> {
  const url: string = process.env.REACT_APP_API_URL + '/api/characters/removespell';

  return fetch(url, {
    body: JSON.stringify(characterAndSpellId),
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
