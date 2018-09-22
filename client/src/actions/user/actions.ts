import { Dispatch } from 'redux';
import {
  createCharacter as createCharacterFromApi,
  deleteCharacter as deleteCharacterFromApi,
  updateCharacter as updateCharacterFromApi
} from '../../api/charactersApi';
import { getUserData as getUserDataFromApi } from '../../api/userApi';
import { ICharacterBase, IStoreState, IUserData } from '../../models';
import { Fail, InProgress } from '../common/types';
import { CreateCharacter, DeleteCharacter, GetUser, UpdateCharacter } from './types';

export function getUserData(): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const user: IUserData = await getUserDataFromApi();
      dispatch(GetUser.create({ user }));
    } catch (error) {
      dispatch(Fail.create(error));
    }
  };
}

export function createCharacter(character: ICharacterBase): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const user: IUserData = await createCharacterFromApi(character);
      dispatch(CreateCharacter.create({ user }));
    } catch (error) {
      dispatch(Fail.create(error));
    }
  };
}

export function updateCharacter(character: { id: string } & ICharacterBase): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const user: IUserData = await updateCharacterFromApi(character);
      dispatch(UpdateCharacter.create({ user }));
    } catch (error) {
      dispatch(Fail(error));
    }
  };
}

export function deleteCharacter(characterId: string): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(InProgress.create());

    try {
      const user: IUserData = await deleteCharacterFromApi({ characterId });
      dispatch(DeleteCharacter.create({ user }));
    } catch (error) {
      dispatch(DeleteCharacter.create(error));
    }
  };
}
