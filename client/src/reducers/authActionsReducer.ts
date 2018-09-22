import { IStoreState } from 'models';
import { setWith, TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';

export const authReducer = TypedReducer.builder<boolean>()
  .withHandler(SignIn.TYPE, (state) => {
    return setWith(state, true);
  })
  .withHandler(SignOut.TYPE, (state) => {
    return setWith(state, false)
  })
  .build()