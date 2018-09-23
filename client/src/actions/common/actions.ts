import ApiError from 'api/ApiError';
import { Dispatch } from 'redux';
import { IStoreState } from '../../models';
import { AuthFail, Fail } from './types';

export function dispatchError(dispatch: Dispatch<IStoreState>, error: ApiError) {
  const genericError: Error = Error(error.message);
  if (error.status === 401) {
    dispatch(AuthFail.create({ error: genericError }));
  } else {
    dispatch(Fail.create({ error: genericError }));
  }
}
