import { Dispatch } from 'redux';
import {
  createCharacter as createCharacterFromApi,
  deleteCharacter as deleteCharacterFromApi,
  getCharacters   as getCharactersFromApi,
  updateCharacter as updateCharacterFromApi
} from '../../api/charactersApi';
// import { getUserData as getUserDataFromApi } from '../../api/userApi';
import { ICharacter, ICharacterBase, IStoreState } from '../../models';
import { dispatchError } from '../common/actions';
import { InProgress } from '../common/types';
import { CreateCharacter, DeleteCharacter, GetCharacters, UpdateCharacter } from './types';

export function getCharacters(): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());

    try {
      const characters: ICharacter[] = await getCharactersFromApi(getState().token);
      dispatch(GetCharacters.create({ characters }));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function createCharacter(newCharacter: ICharacterBase): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());

    try {
      const character: ICharacter = await createCharacterFromApi(newCharacter, getState().token);
      dispatch(CreateCharacter.create({ character }));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function updateCharacter(updatedCharacter: { id: number } & ICharacterBase): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());

    try {
      const character: ICharacter = await updateCharacterFromApi(updatedCharacter, getState().token);
      dispatch(UpdateCharacter.create({ character }));
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}

export function deleteCharacter(characterId: number): (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>, getState: () => IStoreState) => {
    dispatch(InProgress.create());

    try {
      await deleteCharacterFromApi({ characterId }, getState().token);
      dispatch(DeleteCharacter.create());
    } catch (error) {
      dispatchError(dispatch, error);
    }
  };
}
