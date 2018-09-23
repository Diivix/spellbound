import { TypedAction } from 'redoodle';

export const InProgress = TypedAction.defineWithoutPayload('COMMON::INPROGRESS')();

export const Fail = TypedAction.define('COMMON::FAIL')<{error: Error}>();

export const AuthFail = TypedAction.define('COMMON::AUTH_FAIL')<{error: Error}>();
