import { AuthFail } from 'actions/common/types';
import { TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';

function createReducer() {
  return TypedReducer.builder<boolean>()
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
}

export const authReducer = createReducer();
