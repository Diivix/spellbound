import { ICharacterBase, IStoreState, IUserData } from 'models';
import { Dispatch } from 'redux';
import {
  createCharacter as createCharacterFromApi,
  deleteCharacter as deleteCharacterFromApi,
  updateCharacter as updateCharacterFromApi
} from '../../api/charactersApi';
import keys from '../ActionTypeKeys';
import { ICreateCharacterFailAction, ICreateCharacterInprogressAction, ICreateCharacterSuccessAction } from './createcharacter';
import { IDeleteCharacterFailAction, IDeleteCharacterInprogressAction, IDeleteCharacterSuccessAction } from './deleteCharacter';
import { IUpdateCharacterFailAction, IUpdateCharacterInprogressAction, IUpdateCharacterSuccessAction } from './updatecharacter';

export function createCharacter(character: ICharacterBase): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(createCharacterInprogress());

    try {
      const user: IUserData = await createCharacterFromApi(character);

      dispatch(createCharacterSuccess(user));
    } catch (err) {
      dispatch(createCharacterFail(err));
    }
  };
}

export function updateCharacter(character: { id: string } & ICharacterBase): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(updateCharacterInprogress());

    try {
      const user: IUserData = await updateCharacterFromApi(character);

      dispatch(updateCharacterSuccess(user));
    } catch (err) {
      dispatch(updateCharacterFail(err));
    }
  };
}

export function deleteCharacter(characterId: string): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(deleteCharacterInprogress());

    try {
      const user: IUserData = await deleteCharacterFromApi({ characterId });

      dispatch(deleteCharacterSuccess(user));
    } catch (err) {
      dispatch(deleteCharacterFail(err));
    }
  };
}

function createCharacterFail(error: Error): ICreateCharacterFailAction {
  const errorType: keys.CREATE_CHARACTER_FAIL | keys.CREATE_CHARACTER_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.CREATE_CHARACTER_UNAUTHORISED : keys.CREATE_CHARACTER_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function createCharacterInprogress(): ICreateCharacterInprogressAction {
  return {
    type: keys.CREATE_CHARACTER_INPROGRESS
  };
}

function createCharacterSuccess(user: IUserData): ICreateCharacterSuccessAction {
  return {
    payload: user,
    type: keys.CREATE_CHARACTER_SUCCESS
  };
}

function updateCharacterFail(error: Error): IUpdateCharacterFailAction {
  const errorType: keys.UPDATE_CHARACTER_FAIL | keys.UPDATE_CHARACTER_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.UPDATE_CHARACTER_UNAUTHORISED : keys.UPDATE_CHARACTER_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function updateCharacterInprogress(): IUpdateCharacterInprogressAction {
  return {
    type: keys.UPDATE_CHARACTER_INPROGRESS
  };
}

function updateCharacterSuccess(user: IUserData): IUpdateCharacterSuccessAction {
  return {
    payload: user,
    type: keys.UPDATE_CHARACTER_SUCCESS
  };
}

function deleteCharacterFail(error: Error): IDeleteCharacterFailAction {
  const errorType: keys.DELETE_CHARACTER_FAIL | keys.DELETE_CHARACTER_UNAUTHORISED =
    error.message === 'Unauthorized' ? keys.DELETE_CHARACTER_UNAUTHORISED : keys.DELETE_CHARACTER_FAIL;

  return {
    payload: {
      error
    },
    type: errorType
  };
}

function deleteCharacterInprogress(): IDeleteCharacterInprogressAction {
  return {
    type: keys.DELETE_CHARACTER_INPROGRESS
  };
}

function deleteCharacterSuccess(user: IUserData): IDeleteCharacterSuccessAction {
  return {
    payload: user,
    type: keys.DELETE_CHARACTER_SUCCESS
  };
}
