import { ISpell } from "models";
import keys from "../../ActionTypeKeys";

export interface IGetSpellSuccessAction {
  readonly type: keys.GET_SPELL_SUCCESS;
  readonly payload: ISpell;
}

export interface IGetSpellInProgressAction {
  readonly type: keys.GET_SPELL_INPROGRESS;
}

export interface IGetSpellFailAction {
  readonly type: keys.GET_SPELL_FAIL | keys.GET_SPELL_UNAUTHORISED;
  readonly payload: {
    readonly error: Error;
  };
}
