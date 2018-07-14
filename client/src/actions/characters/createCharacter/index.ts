import { IUserData } from 'models';
import keys from '../../ActionTypeKeys';

export interface ICreateCharacterSuccessAction {
  readonly type: keys.CREATE_CHARACTER_SUCCESS;
  readonly payload: IUserData;
}

export interface ICreateCharacterInprogressAction {
  readonly type: keys.CREATE_CHARACTER_INPROGRESS;
}

export interface ICreateCharacterFailAction {
  readonly type: keys.CREATE_CHARACTER_FAIL | keys.CREATE_CHARACTER_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}
