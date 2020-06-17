import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { QuestionsComponent } from './questions.component';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionShowResolver } from './resolvers/question-show.resolver';

const questionsRoutes: Routes = [
  { path: '', component: QuestionsComponent },
  {
    path: ':id',
    component: QuestionShowComponent,
    resolve: { question: QuestionShowResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(questionsRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class QuestionRoutingModule {}
