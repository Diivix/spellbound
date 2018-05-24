import { handleActions } from 'redux-actions';
import { AUTH_UPDATE } from '../actions/actionTypes';
import { IAuthState } from '../models/models';
import authUpdatedReducer from './authUpdated';

const defaultState: IAuthState = {
  state: 'UNAUTHROISED'
};

export default handleActions<IAuthState, any>(
  {
    [AUTH_UPDATE]: authUpdatedReducer
  },
  defaultState
);
