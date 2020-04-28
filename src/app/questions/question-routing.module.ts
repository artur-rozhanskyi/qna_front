import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { NgModule } from '@angular/core';

const questionsRoutes: Routes = [{ path: '', component: QuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(questionsRoutes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
