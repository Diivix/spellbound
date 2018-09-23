import { Dispatch } from 'redux';
import { signIn as signInToApi, signOut as signOutFromApi } from '../../api/authenticationApi';
import { ICredentials, IStoreState } from '../../models';
import { dispatchError } from '../common/actions';
import { InProgress } from '../common/types';
import { SignIn, SignOut } from './types';

export function signIn(credentials: ICredentials): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      await signInToApi(credentials);
      dispatch(SignIn.create());
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function signOut(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      await signOutFromApi();
      dispatch(SignOut.create());
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}
