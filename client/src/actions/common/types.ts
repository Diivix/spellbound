import { TypedAction } from 'redoodle';

export const InProgress = TypedAction.defineWithoutPayload('COMMON::INPROGRESS')();

export const Fail = TypedAction.define('COMMON::FAIL')<{error: Error}>();