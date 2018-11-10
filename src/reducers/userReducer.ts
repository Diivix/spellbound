import { IUserData } from 'models';
import { TypedReducer } from 'redoodle';
import { SignIn } from '../actions/authentication/types';
import { CreateCharacter, DeleteCharacter, GetUser, UpdateCharacter } from '../actions/user/types';

export const userReducer = TypedReducer.builder<IUserData>()
  .withHandler(SignIn.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .withHandler(GetUser.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .withHandler(CreateCharacter.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .withHandler(UpdateCharacter.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .withHandler(DeleteCharacter.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .build();
