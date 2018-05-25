import { Dispatch } from 'react-redux';
import { ActionCreator } from 'redux';
import { ICredentials } from '../../models/models';
import { IAuthState, IAuthUpdateAction } from './types';

// Action Creators
export function updateAuth(authState: IAuthState): ActionCreator<IAuthUpdateAction> {
  return {
    payload: { authState },
    type: 'AUTH_UPDATE'
  };
}

// AUTH //
// POST
// Expects an { email: 'string', password: 'password' } object.
export function login(credentials: ICredentials) {
  const url = '/api/auth/login';

  return (dispatch: Dispatch<any>) => {
    fetch(url, {
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }) // TODO: Add LOADING status
      .then(response => {
        if (response.status === 200) {
          return response;
        } else if (response.status === 401) {
          throw Error(response.statusText);
        } else {
          throw Error(response.statusText);
        }
      })
      .then(() => dispatch(updateAuth({ authStatus: 'AUTHORISED' })))
      .catch(err => {
        if (err.message === 'Unauthorized') {
          dispatch(updateAuth('UNAUTHORISED'));
        } else {
          dispatch(updateAuth('ERRORED'));
        }
      });
  };
}

// GET
export function logout(credentials: ICredentials) {
  const url = '/api/auth/logout';

  return (dispatch: Dispatch<any>) => {
    fetch(url, {
      credentials: 'include',
      method: 'GET'
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        } else if (response.status === 401) {
          throw Error(response.statusText);
        } else {
          throw Error(response.statusText);
        }
      })
      .then(response => response.json())
      .then(() => dispatch(updateAuth('UNAUTHORISED')))
      .catch(err => {
        if (err.message === 'Unauthorized') {
          dispatch(updateAuth('UNAUTHORISED'));
        } else {
          dispatch(updateAuth('ERRORED'));
        }
      });
  };
}
