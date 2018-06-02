import { Dispatch } from 'redux';
import { getUserData as getUserDataFromApi } from '../../api/userApi';
import { IStoreState, IUserData } from '../../models';
import keys from '../ActionTypeKeys';
import { IGetUserDataFailAction, IGetUserDataInProgressAction, IGetUserDataSuccessAction } from './getuserdata';

export function getUserData(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(userInProgress());

    try {
      const spell: IUserData = await getUserDataFromApi();

      dispatch(userSuccess(spell));
    } catch (err) {
      dispatch(userFail(err));
    }
  };
}

function userFail(error: Error): IGetUserDataFailAction {
  const errorType: keys.GET_USERDATA_FAIL | keys.GET_USERDATA_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.GET_USERDATA_UNAUTHORISED_FAIL : keys.GET_USERDATA_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function userInProgress(): IGetUserDataInProgressAction {
  return {
    type: keys.GET_USERDATA_INPROGRESS
  };
}

function userSuccess(userData: IUserData): IGetUserDataSuccessAction {
  return {
    payload: userData,
    type: keys.GET_USERDATA_SUCCESS
  };
}
