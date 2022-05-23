import { Component, Input, OnInit } from '@angular/core';
import { Quizsettings } from '../quizsettings/quizsettings.component';
import { Card } from '../card/card.component';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @Input() quizSettings: Quizsettings = {
    theme: "",
    amount: 0,
    repetitive: false,
  }

  cards: Card[] = [];
  current_id: number = 0;
  status: string = "question";

  constructor(private data: DatabaseService) { }

  async ngOnInit() {
    console.log("here we are now")
    await this.data.loadQuestions(this.quizSettings.theme, this.quizSettings.amount);
    this.cards = this.data.questions;
    console.log("x")
    console.log(this.cards);
  }

  showAnswer(): void {
    this.status = "answer";
  }

  badAnswer(): void {
    this.status = "question"
    if (this.cards[this.current_id] != this.cards[-1]) {
      if (this.quizSettings.repetitive) {
        this.current_id += 1;
      } else {
        this.cards.splice(this.current_id, 1);
      }
    } else if (this.quizSettings.repetitive) {
      console.log("here we are now")
      this.current_id = 0;
    } else {
      // quiz done
    }
  }

  goodAnswer(): void {
    this.status = "question";
    if (this.cards[this.current_id] != this.cards[-1]) {
      this.cards.splice(this.current_id, 1);
    } else if (this.quizSettings.repetitive) {
      console.log("here we are now");
      this.current_id = 0;
    } else {
      // quiz done
    }
  }

}
