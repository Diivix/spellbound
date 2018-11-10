import { ICredentials } from 'models';
import { IUserData } from 'models';
import ApiError from './ApiError';

export function signIn(credentials: ICredentials): Promise<IUserData> {
  const url = '/Account/SignIn';

  return fetch(url, {
    body: JSON.stringify(credentials),
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
        throw new ApiError(response.status, response.statusText);
      }
    })
    .then(response => response.json())
    .then((user: IUserData) => {
      return user;
    });
}

export function signOut(): Promise<{}> {
  const url = '/Account/SignOut';

  return fetch(url, {
    credentials: 'include',
    method: 'GET'
  }).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  });
}
