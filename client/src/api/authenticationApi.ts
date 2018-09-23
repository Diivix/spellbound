import { ICredentials } from 'models';
import ApiError from './ApiError';

export function signIn(credentials: ICredentials): Promise<{}> {
  const url = '/api/auth/signin';

  return fetch(url, {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  });
}

export function signOut(): Promise<{}> {
  const url = '/api/auth/signout';

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
