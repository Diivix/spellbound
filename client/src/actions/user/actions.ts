import { Dispatch } from 'redux';
import { getUserData as getUserDataFromApi } from '../../api/userApi';
import { IStoreState, IUserData } from '../../models';
import { Fail, InProgress } from '../common/types';
import { GetUser } from './types';

export function getUserData(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const user: IUserData = await getUserDataFromApi();
      dispatch(GetUser.create({ user }));
    } catch (error) {
      dispatch(Fail.create(error));
    }
  };
}
