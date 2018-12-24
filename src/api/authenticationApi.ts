import { ICredentials } from 'models';
import { IUserData } from 'models';
import ApiError from './ApiError';

export function signIn(credentials: ICredentials): Promise<{token: string; user: IUserData}> {
  const url = '/api/Account/SignIn';

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
    .then((userWithToken: {token: string; user: IUserData} ) => {
      return userWithToken;
    });
}

export function signOut(token: string): Promise<{}> {
  const url = '/api/Account/SignOut';

  return fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },    
    method: 'GET',
  }).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  });
}
