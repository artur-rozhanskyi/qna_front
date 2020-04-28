import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { questionReducer } from './store/question.reducers';
import { QuestionEffects } from './store/question.effects';
import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './question/question.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [QuestionsComponent, QuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  providers: [],
})
export class QuestionsModule {}
