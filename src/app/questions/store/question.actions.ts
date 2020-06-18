import { createAction, props } from '@ngrx/store';

import { Question } from '../question.model';

export const FETCH_QUESTIONS = '[Questions] Fetch Questions';
export const SET_QUESTIONS = '[Questions] Set Questions';
export const LOAD_FAIL = '[Questions] LOAD_FAIL';
export const QUESTION_CREATE = '[Questions] Question Create';
export const QUESTION_CREATE_SUCCESS = '[Questions] Question Create Success';
export const QUESTION_CREATE_FAIL = '[Questions] Question Create Fail';

export const fetchQuestions = createAction(FETCH_QUESTIONS);
export const setQuestions = createAction(
  SET_QUESTIONS,
  props<{ questions: Question[] }>()
);
export const loadFail = createAction(
  LOAD_FAIL,
  props<{ errorMessage: string }>()
);

export const questionCreate = createAction(
  QUESTION_CREATE,
  props<{ question: Question }>()
);
export const questionCreateSuccess = createAction(
  QUESTION_CREATE_SUCCESS,
  props<{ question: Question }>()
);
export const questionCreateFail = createAction(
  QUESTION_CREATE_FAIL,
  props<{ error: string }>()
);
