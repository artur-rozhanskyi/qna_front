import { NgModule } from '@angular/core';
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
import { QuestionNewComponent } from './question-new/question-new.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    QuestionShowComponent,
    QuestionNewComponent,
  ],
  imports: [
    SharedModule,
    QuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  providers: [QuestionShowResolver],
})
export class QuestionsModule {}
