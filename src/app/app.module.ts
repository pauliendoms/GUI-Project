import { Component, NgModule } from '@angular/core';
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
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PersonalFoldersComponent } from './personal-folders/personal-folders.component';
import { PublicFoldersComponent } from './public-folders/public-folders.component';
import { AdminGuard } from './auth/admin.guard';
import { ButtonColorDirective } from './button-color.directive';
import { getStorage, provideStorage } from '@angular/fire/storage';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: "full"},
  {path: 'cards', component: FolderviewComponent, canActivate: [AuthGuard], children: [
    {path: '', component: PersonalFoldersComponent},
    {path: 'public', component: PublicFoldersComponent, canActivate: [AdminGuard]}
  ]},
  {path: 'cards/:id', component: CardsviewComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard]},
  {path: 'quiz', loadChildren: () => import('./quizpage/quizpage.module').then(m => m.QuizpageModule), canLoad: [AuthGuard]},
  {path: '**', redirectTo: ''}
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
    HomeComponent,
    PublicFoldersComponent,
    PersonalFoldersComponent,
    ButtonColorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
