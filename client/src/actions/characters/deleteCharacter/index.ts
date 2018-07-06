import { IUserData } from 'models';
import keys from '../../ActionTypeKeys';

export interface IDeleteCharacterSuccessAction {
  readonly type: keys.DELETE_CHARACTER_SUCCESS;
  readonly payload: IUserData;
}

export interface IDeleteCharacterInprogressAction {
  readonly type: keys.DELETE_CHARACTER_INPROGRESS;
}

export interface IDeleteCharacterFailAction {
  readonly type: keys.DELETE_CHARACTER_FAIL | keys.DELETE_CHARACTER_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}
