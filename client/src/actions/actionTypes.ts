import { ISignInFailAction, ISignInInProgressAction, ISignInSuccessAction } from './authentication/signin';
import { ISignOutFailAction, ISignOutInProgressAction, ISignOutSuccessAction } from './authentication/signout';
import { ICreateCharacterFailAction, ICreateCharacterInprogressAction, ICreateCharacterSuccessAction } from './characters/createcharacter';
import { IDeleteCharacterFailAction, IDeleteCharacterInprogressAction, IDeleteCharacterSuccessAction } from './characters/deleteCharacter';
import { IUpdateCharacterFailAction, IUpdateCharacterInprogressAction, IUpdateCharacterSuccessAction } from './characters/updatecharacter';
import {
  IGetLightSpellsWithFiltersFailAction,
  IGetLightSpellsWithFiltersInProgressAction,
  IGetLightSpellsWithFiltersSuccessAction
} from './spells/getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './spells/getspell';
import { ISetFiltersFailAction, ISetFiltersSuccessAction } from './spells/setAppliedFilters';
import { IGetUserDataFailAction, IGetUserDataInProgressAction, IGetUserDataSuccessAction } from './user/getuserdata';

type ActionTypes =
  | ISignInFailAction
  | ISignInInProgressAction
  | ISignInSuccessAction
  | ISignOutFailAction
  | ISignOutInProgressAction
  | ISignOutSuccessAction
  | IGetLightSpellsWithFiltersFailAction
  | IGetLightSpellsWithFiltersInProgressAction
  | IGetLightSpellsWithFiltersSuccessAction
  | IGetSpellFailAction
  | IGetSpellInProgressAction
  | IGetSpellSuccessAction
  | ISetFiltersFailAction
  | ISignInInProgressAction
  | ISetFiltersSuccessAction
  | IGetUserDataFailAction
  | IGetUserDataInProgressAction
  | IGetUserDataSuccessAction
  | ICreateCharacterFailAction
  | ICreateCharacterInprogressAction
  | ICreateCharacterSuccessAction
  | IUpdateCharacterFailAction
  | IUpdateCharacterInprogressAction
  | IUpdateCharacterSuccessAction
  | IDeleteCharacterFailAction
  | IDeleteCharacterInprogressAction
  | IDeleteCharacterSuccessAction;

export default ActionTypes;
