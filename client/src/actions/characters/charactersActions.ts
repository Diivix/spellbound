import { ICharacterBase, IStoreState, IUserData } from 'models';
import { Dispatch } from 'redux';
import { createCharacter as createCharacterFromApi } from '../../api/charactersApi';
import keys from '../ActionTypeKeys';
import { ICreateCharacterFailAction, ICreateCharacterInprogressAction, ICreateCharacterSuccessAction } from './createcharacter';

export function createCharacter(name: string, classType?: string, level?: number, description?: string): (dispatch: Dispatch<IStoreState>) => Promise<void> {
  const character: ICharacterBase = { name, classType, level, description }
  return async (dispatch: Dispatch<IStoreState>) => {
    // Signal work in progress.
    dispatch(createCharacterInprogress());

    try {
      const user: IUserData = await createCharacterFromApi(character);

      dispatch(createCharacterSuccess(user));
    } catch (err) {
      dispatch(createCharacterFail(err));
    }
  };
}

function createCharacterFail(error: Error): ICreateCharacterFailAction {
  const errorType: keys.CREATE_CHARACTER_FAIL | keys.CREATE_CHARACTER_UNAUTHORISED_FAIL =
    error.message === 'Unauthorized' ? keys.CREATE_CHARACTER_FAIL : keys.CREATE_CHARACTER_UNAUTHORISED_FAIL;

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
