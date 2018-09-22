import { IUserData } from 'models';
import { setWith, TypedReducer } from 'redoodle';
import { GetUser } from '../actions/user/types';

export const userReducer = TypedReducer.builder<IUserData>()
  .withHandler(GetUser.TYPE, (state, payload) => {
    return setWith(state, payload.user);
  })
  // TODO: add character reducers here.
  .build()