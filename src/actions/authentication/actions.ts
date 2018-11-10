import { Dispatch } from 'redux';
import { signIn as signInToApi, signOut as signOutFromApi } from '../../api/authenticationApi';
import { ICredentials, IStoreState } from '../../models';
import { dispatchError } from '../common/actions';
import { InProgress } from '../common/types';
import { SignIn, SignOut } from './types';

export function signIn(credentials: ICredentials): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const userWithToken = await signInToApi(credentials);
      dispatch(SignIn.create(userWithToken));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function signOut(): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());

    try {
      const token = getState().token;
      await signOutFromApi(token);
      dispatch(SignOut.create());
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}
