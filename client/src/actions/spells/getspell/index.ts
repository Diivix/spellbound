import { ISpell } from "models";
import keys from "../../ActionTypeKeys";

export interface IGetSpellSuccessAction {
  readonly type: keys.GETSPELL_SUCCESS;
  readonly payload: ISpell;
}

export interface IGetSpellInProgressAction {
  readonly type: keys.GETSPELL_INPROGRESS;
}

export interface IGetSpellFailAction {
  readonly type: keys.GETSPELL_FAIL | keys.GETSPELL_UNAUTHORISED_FAIL;
  readonly payload: {
    readonly error: Error;
  };
}
