import { Fail, InProgress } from 'actions/common/types';
import { setWith, TypedReducer } from 'redoodle';

export const pendingActionsReducer = TypedReducer.builder<number>()
  .withHandler(InProgress.TYPE, (state) => {
    return setWith(state, state + 1);
  })
  .withHandler(Fail.TYPE, (state) => {
    return setWith(state, state > 0 ? state - 1 : 0)
  })
  .withDefaultHandler((state) => {
    // All other actions completed, either by success or failure
    return setWith(state, state > 0 ? state - 1 : 0)
  })
  .build()