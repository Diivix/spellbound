import { IUserData } from 'models';
import { TypedAction } from 'redoodle';

export const GetUser = TypedAction.define('USER::GET_USER')<{ user: IUserData }>();

export const CreateCharacter = TypedAction.define('USER::CREATE_USER')<{ user: IUserData }>();

export const DeleteCharacter = TypedAction.define('USER::DELETE_CHARACTER')<{ user: IUserData }>();

export const UpdateCharacter = TypedAction.define('USER::UPDATE_CHARACTER')<{ user: IUserData }>();
