import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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

  @Output() quizStop = new EventEmitter();

  constructor(private data: DatabaseService) { }

  async ngOnInit() {
    await this.data.loadQuestions(this.quizSettings.theme, this.quizSettings.amount);
    this.cards = this.data.questions;
  }

  showAnswer(): void {
    this.status = "answer";
  }

  badAnswer(): void {
    this.status = "question"
    if (this.cards[this.current_id] != this.cards[this.cards.length-1]) {
      if (this.quizSettings.repetitive) {
        this.current_id += 1;
      } else {
        this.cards.splice(this.current_id, 1);
      }
    } else if (this.quizSettings.repetitive) {
      this.current_id = 0;
      if (this.cards.length == 0) {
        this.quizStop.emit();
      }
    } else {
      this.quizStop.emit();
    }
  }

  goodAnswer(): void {
    this.status = "question";
    if (this.cards[this.current_id] != this.cards[this.cards.length-1]) {
      this.cards.splice(this.current_id, 1);
    } else if (this.quizSettings.repetitive) {
      this.cards.splice(this.current_id, 1);
      this.current_id = 0;
      if (this.cards.length == 0) {
        this.quizStop.emit();
      }
    } else {
      this.quizStop.emit();
    }
  }

}
