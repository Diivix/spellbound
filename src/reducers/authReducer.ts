import { AuthFail } from 'actions/common/types';
import { TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';

export const authReducer = TypedReducer.builder<boolean>()
  .withHandler(SignIn.TYPE, () => {
    return true;
  })
  .withHandler(SignOut.TYPE, () => {
    return false;
  })
  .withHandler(AuthFail.TYPE, () => {
    return false;
  })
  .build();
