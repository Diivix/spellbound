import { TypedReducer } from 'redoodle';
import { SignIn,SignOut } from '../actions/authentication/types';

export const tokenReducer = TypedReducer.builder<string>()
  .withHandler(SignIn.TYPE, (state, payload) => {
    return state = payload.token;
  })
  .withHandler(SignOut.TYPE, (state) => {
    return state = '';
  })
  .build();
