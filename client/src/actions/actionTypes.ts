import { ISignInFailAction, ISignInInProgressAction, ISignInSuccessAction } from './authentication/signin';
import { ISignOutFailAction, ISignOutInProgressAction, ISignOutSuccessAction } from './authentication/signout';
import { IGetLightSpellsWithFiltersFailAction, IGetLightSpellsWithFiltersInProgressAction, IGetLightSpellsWithFiltersSuccessAction } from './spells/getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './spells/getspell';
import { IGetUserDataFailAction, IGetUserDataInProgressAction, IGetUserDataSuccessAction } from './user/getuserdata'

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
  | IGetUserDataFailAction
  | IGetUserDataInProgressAction
  | IGetUserDataSuccessAction

export default ActionTypes;
