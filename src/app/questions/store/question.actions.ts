import { createAction, props } from '@ngrx/store';

import { Question } from '../question.model';

export const FETCH_QUESTIONS = '[Questions] Fetch Questions';
export const SET_QUESTIONS = '[Questions] Set Questions';
export const LOAD_FAIL = '[Questions] LOAD_FAIL';

export const fetchQuestions = createAction(FETCH_QUESTIONS);
export const setQuestions = createAction(SET_QUESTIONS, props<{questions: Question[]}>());
export const loadFail = createAction(LOAD_FAIL, props<{errorMessage: string}>());
