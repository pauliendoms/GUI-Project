import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizpageRoutingModule } from './quizpage-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuizviewComponent } from './quizview/quizview.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { QuizsettingsComponent } from './quizsettings/quizsettings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizComponent,
    QuizviewComponent,
    QuizCardComponent,
    QuizsettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuizpageRoutingModule,
  ]
})
export class QuizpageModule { }
