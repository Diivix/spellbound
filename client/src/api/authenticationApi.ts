import { ICredentials } from "models";

export function signIn(credentials: ICredentials): Promise<{}> {
  const url = '/api/auth/login';

  return fetch(url, {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

export function signOut(): Promise<{}> {
  const url = '/api/auth/logout';
  
  return fetch(url, {
    credentials: 'include',
    method: 'GET'
})
}
