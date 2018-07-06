import ActionTypeKeys, { ActionTypeStates } from '../actions/ActionTypeKeys';
import ActionTypes from '../actions/ActionTypes';
import initialState from './initialState';

export default function authActionsReducer(state = initialState.isAuthenticated, action: ActionTypes): boolean {
  if (actionTypeEndsInSuccess(action.type)) {
    return true;
  } else if (actionTypeEndsInUnauthorised(action.type)) {
    return false;
  } else {
    return state;
  }
}

function actionTypeEndsInSuccess(type: ActionTypeKeys): boolean {
  const success = ActionTypeStates.SUCCESS;
  return type.substring(type.length - success.length) === success;
}

function actionTypeEndsInUnauthorised(type: ActionTypeKeys): boolean {
  const unauthorised = ActionTypeStates.UNAUTHORISED;
  return type.substring(type.length - unauthorised.length) === unauthorised;
}