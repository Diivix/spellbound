import { ICharacter } from 'models';
import { TypedAction } from 'redoodle';

export const GetCharacters = TypedAction.define('CHARACTERS::GET_CHARACTERS')<{ characters: ICharacter[] }>();

export const CreateCharacter = TypedAction.define('CHARACTERS::CREATE_CHARACTER')<{ character: ICharacter }>();

export const UpdateCharacter = TypedAction.define('CHARACTERS::UPDATE_CHARACTER')<{ character: ICharacter }>();

export const DeleteCharacter = TypedAction.defineWithoutPayload('CHARACTERS::DELETE_CHARACTER')();
