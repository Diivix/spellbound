import { TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';
import { AuthFail } from '../actions/common/types';

export const tokenReducer = TypedReducer.builder<string>()
  .withHandler(SignIn.TYPE, (state, payload) => {
    return (state = payload.token);
  })
  .withHandler(SignOut.TYPE, state => {
    return (state = '');
  })
  .withHandler(AuthFail.TYPE, state => {
    return (state = '');
  })
  .build();
