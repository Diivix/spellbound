import { IUserData } from 'models';
import keys from '../../ActionTypeKeys';

export interface IGetUserDataSuccessAction {
  readonly type: keys.GET_USERDATA_SUCCESS;
  readonly payload: IUserData;
}

export interface IGetUserDataInProgressAction {
  readonly type: keys.GET_USERDATA_INPROGRESS;
}

export interface IGetUserDataFailAction {
  readonly type: keys.GET_USERDATA_FAIL | keys.GET_USERDATA_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}
