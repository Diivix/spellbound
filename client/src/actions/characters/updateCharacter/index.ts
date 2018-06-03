import { IUserData } from 'models';
import keys from '../../ActionTypeKeys';

export interface IUpdateCharacterSuccessAction {
  readonly type: keys.UPDATE_CHARACTER_SUCCESS;
  readonly payload: IUserData;
}

export interface IUpdateCharacterInprogressAction {
  readonly type: keys.UPDATE_CHARACTER_INPROGRESS;
}

export interface IUpdateCharacterFailAction {
  readonly type: keys.UPDATE_CHARACTER_FAIL | keys.UPDATE_CHARACTER_UNAUTHORISED_FAIL;
  readonly payload: {
    readonly error: Error;
  };
}
