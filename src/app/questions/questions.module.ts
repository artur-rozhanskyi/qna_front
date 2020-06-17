import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { questionReducer } from './store/question.reducers';
import { QuestionEffects } from './store/question.effects';
import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './question/question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionShowResolver } from './resolvers/question-show.resolver';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [QuestionsComponent, QuestionComponent, QuestionShowComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedModule,
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  providers: [QuestionShowResolver],
})
export class QuestionsModule {}
