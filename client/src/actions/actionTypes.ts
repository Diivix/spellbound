import { ISignInFailAction, ISignInInProgressAction, ISignInSuccessAction } from './authentication/signin';
import { ISignOutFailAction, ISignOutInProgressAction, ISignOutSuccessAction } from './authentication/signout';
import { IGetLightSpellsWithFiltersFailAction, IGetLightSpellsWithFiltersInProgressAction, IGetLightSpellsWithFiltersSuccessAction } from './spells/getlightspellswithfilters';
import { IGetSpellFailAction, IGetSpellInProgressAction, IGetSpellSuccessAction } from './spells/getspell';

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
  | IGetSpellSuccessAction;

export default ActionTypes;
