import { IUserData } from 'models';
import { TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';
import { AuthFail } from '../actions/common/types';
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
  // Remove user data on sign out or fail.
  .withHandler(SignOut.TYPE, state => {
    return Object.assign({}, state, { userName: '', characters: null });
  })
  .withHandler(AuthFail.TYPE, state => {
    return Object.assign({}, state, { userName: '', characters: null });
  })
  .build();
