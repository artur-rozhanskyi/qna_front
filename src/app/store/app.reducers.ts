import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromQuestion from '../questions/store/question.reducers';

export interface AppState {
  questions: fromQuestion.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  questions: fromQuestion.questionReducer,
};
