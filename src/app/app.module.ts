import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsviewComponent } from './cardsview/cardsview.component';
import { QuizviewComponent } from './quizview/quizview.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FolderviewComponent } from './folderview/folderview.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizsettingsComponent } from './quizsettings/quizsettings.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { LimitLengthPipe } from './limit-length.pipe';

const routes: Routes = [
  {path: '', redirectTo: 'cards', pathMatch: "full"},
  {path: 'cards', component: FolderviewComponent},
  {path: 'quiz', component: QuizviewComponent},
  {path: 'cards/:id', component: CardsviewComponent},
  {path: '**', redirectTo: 'cards'}
]

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    NavbarComponent,
    CardsviewComponent,
    QuizviewComponent,
    CardComponent,
    FolderviewComponent,
    QuizsettingsComponent,
    QuizComponent,
    QuizCardComponent,
    LimitLengthPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
