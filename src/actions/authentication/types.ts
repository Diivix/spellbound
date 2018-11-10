import { IUserData } from 'models';
import { TypedAction } from 'redoodle';

export const SignIn = TypedAction.define('AUTH::SIGNIN')<{ user: IUserData }>();

export const SignOut = TypedAction.defineWithoutPayload('AUTH::SIGNOUT')();
