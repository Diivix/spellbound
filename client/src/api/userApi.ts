import { IUserData } from "models";

// GET
// Gets user data, from current session
export function getUserData(): Promise<IUserData> {
  const url: string = '/api/users/currentuser';

  return fetch(url, {
    credentials: 'include',
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
    .then((spell: IUserData) => {
      return spell;
    });
}