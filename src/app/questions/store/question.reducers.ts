import { createReducer, on, Action } from '@ngrx/store';

import { Question } from '../question.model';
import * as QuestionActions from './question.actions';

export interface State {
  questions: Question[],
  errorMessage: string,
  loading: boolean
}

const initialState: State = {
  questions: [],
  errorMessage: null,
  loading: false
};

const questionReducer$ = createReducer(
  initialState,
  on(QuestionActions.fetchQuestions, state => ({...state, loading: true })),
  on(QuestionActions.setQuestions, (state, payload) => ({
    ...state,
    questions: [...payload.questions],
    errorMessage: null,
    loading: false
  })),
  on(QuestionActions.loadFail, (state, payload) => ({
    ...state,
    errorMessage: payload.errorMessage,
    loading: false
  }))
);

export function questionReducer(state: State | undefined, action: Action) {
  return questionReducer$(state, action);
}
