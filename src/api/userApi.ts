import { IUserData } from 'models';
import ApiError from './ApiError';

// GET
// Gets user data, from current session
export function getUserData(): Promise<IUserData> {
  const url: string = process.env.REACT_APP_API_URL + '/api/users/currentuser';

  return fetch(url, {
    credentials: 'include',
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
