import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardsviewComponent } from './cardsview/cardsview.component';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FolderviewComponent } from './folderview/folderview.component';
import { HttpClientModule } from '@angular/common/http';
import { LimitLengthPipe } from './limit-length.pipe';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {path: 'cards', component: FolderviewComponent},
  {path: 'quiz', loadChildren: () => import('./quizpage/quizpage.module').then(m => m.QuizpageModule)},
  {path: 'cards/:id', component: CardsviewComponent},
  {path: '**', redirectTo: 'cards'}
]

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    NavbarComponent,
    CardsviewComponent,
    CardComponent,
    FolderviewComponent,
    LimitLengthPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
