import { IUserData } from 'models';
import { TypedAction } from 'redoodle';

export const SignIn = TypedAction.define('AUTH::SIGNIN')<{ token: string; user: IUserData }>();

export const SignOut = TypedAction.defineWithoutPayload('AUTH::SIGNOUT')();


