import { Fail, InProgress } from 'actions/common/types';
import { TypedReducer } from 'redoodle';

export const pendingActionsReducer = TypedReducer.builder<number>()
  .withHandler(InProgress.TYPE, state => {
    return state + 1;
  })
  .withHandler(Fail.TYPE, state => {
    return state > 0 ? state - 1 : 0;
  })
  .withDefaultHandler(state => {
    // All other actions completed, either by success or failure
    return state > 0 ? state - 1 : 0;
  })
  .build();
