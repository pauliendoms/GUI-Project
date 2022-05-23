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
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizsettingsComponent } from './quizsettings/quizsettings.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCardComponent } from './quiz-card/quiz-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cards', component: FolderviewComponent},
  {path: 'quiz', component: QuizviewComponent},
  {path: 'cards/:id', component: CardsviewComponent}
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
    HomeComponent,
    QuizsettingsComponent,
    QuizComponent,
    QuizCardComponent,
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
