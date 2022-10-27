import { Component, OnInit } from '@angular/core';
import { Quizsettings } from '../quizsettings/quizsettings.component';

@Component({
  selector: 'app-quizview',
  templateUrl: './quizview.component.html',
  styleUrls: ['./quizview.component.css']
})
export class QuizviewComponent implements OnInit {

  quiz: boolean = false;
  quizSettings : Quizsettings = {
    theme: "",
    amount: 0,
    repetitive: false,
    folderId: ""
  }

  constructor() {}

  ngOnInit(): void {
  }

  startQuiz(settings: Quizsettings) {
    this.quizSettings = settings;
    this.quiz = true;
  }

}
