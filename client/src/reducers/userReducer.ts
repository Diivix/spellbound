import { IUserData } from 'models';
import { setWith, TypedReducer } from 'redoodle';
import { CreateCharacter, DeleteCharacter, GetUser, UpdateCharacter } from '../actions/user/types';

export const userReducer = TypedReducer.builder<IUserData>()
  .withHandler(GetUser.TYPE, (state, payload) => {
    return setWith(state, payload.user);
  })
  .withHandler(CreateCharacter.TYPE , (state, payload) => {
    return setWith(state, payload.user);
  })
  .withHandler(UpdateCharacter.TYPE , (state, payload) => {
    return setWith(state, payload.user);
  })
  .withHandler(DeleteCharacter.TYPE , (state, payload) => {
    return setWith(state, payload.user);
  })
  .build()