import ActionTypeKeys, { ActionTypeStates } from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function pendingActionsReducer(state = initialState.pendingActions, action: ActionTypes): number {
  if (actionTypeEndsInInProgress(action.type)) {
    return state + 1;
  } else if (actionTypeEndsInSuccess(action.type) || actionTypeEndsInFail(action.type) || actionTypeEndsInUnauthorised(action.type)) {
    return state > 0 ? state - 1 : 0;
  } else {
    return state;
  }
}

function actionTypeEndsInInProgress(type: ActionTypeKeys): boolean {
  const inProgress = ActionTypeStates.INPROGRESS;
  return type.substring(type.length - inProgress.length) === inProgress;
}

function actionTypeEndsInSuccess(type: ActionTypeKeys): boolean {
  const success = ActionTypeStates.SUCCESS;
  return type.substring(type.length - success.length) === success;
}

function actionTypeEndsInFail(type: ActionTypeKeys): boolean {
  const fail = ActionTypeStates.FAIL;
  return type.substring(type.length - fail.length) === fail;
}

function actionTypeEndsInUnauthorised(type: ActionTypeKeys): boolean {
  const unauthorised = ActionTypeStates.UNAUTHORISED;
  return type.substring(type.length - unauthorised.length) === unauthorised;
}