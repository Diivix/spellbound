import { IUserData } from 'models';
import { TypedReducer } from 'redoodle';
import { SignIn, SignOut } from '../actions/authentication/types';
import { CreateCharacter, GetCharacters, UpdateCharacter } from '../actions/characters/types';
import { AuthFail } from '../actions/common/types';

export const userReducer = TypedReducer.builder<IUserData>()
  .withHandler(SignIn.TYPE, (state, payload) => {
    return Object.assign({}, state, payload.user);
  })
  .withHandler(CreateCharacter.TYPE, (state, payload) => {
    const characters = JSON.parse(JSON.stringify(state.characters));
    characters.push(payload.character);
    return Object.assign({}, state, { characters });
  })
  .withHandler(GetCharacters.TYPE, (state, payload) => {
    return Object.assign({}, state, { characters: payload.characters });
  })
  .withHandler(UpdateCharacter.TYPE, (state, payload) => {
    return Object.assign({}, state, { characters: payload.character });
  })
  // TODO: allow character deletions
  // .withHandler(DeleteCharacter.TYPE, (state, payload) => {
  //   return Object.assign({}, state, payload.c);
  // })
  // Remove user data on sign out or fail.
  .withHandler(SignOut.TYPE, state => {
    return Object.assign({}, state, { userName: '', characters: null });
  })
  .withHandler(AuthFail.TYPE, state => {
    return Object.assign({}, state, { userName: '', characters: null });
  })
  .build();
