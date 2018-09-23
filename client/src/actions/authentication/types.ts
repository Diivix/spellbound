import { TypedAction } from 'redoodle';

export const SignIn = TypedAction.defineWithoutPayload('AUTH::SIGNIN')();

export const SignOut = TypedAction.defineWithoutPayload('AUTH::SIGNOUT')();

