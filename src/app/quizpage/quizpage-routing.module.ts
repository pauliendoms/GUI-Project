import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizsettingsComponent } from './quizsettings/quizsettings.component';
import { QuizviewComponent } from './quizview/quizview.component';

const routes: Routes = [
  {path: '', component: QuizviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizpageRoutingModule { }
