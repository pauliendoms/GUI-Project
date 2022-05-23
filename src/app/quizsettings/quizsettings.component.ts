import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quizsettings',
  templateUrl: './quizsettings.component.html',
  styleUrls: ['./quizsettings.component.css']
})
export class QuizsettingsComponent implements OnInit {

  constructor(public data : DatabaseService) { }

  quizsettings : Quizsettings = {
    theme: "",
    amount: 1,
    repetitive: false,
  }

  selected : string = "";

  @Output() quizStart = new EventEmitter<Quizsettings>();

  ngOnInit(): void {
    this.data.updateFolders();
  }

  startQuiz() {
    console.log(this.quizsettings);

    if (this.quizsettings.theme == "") return;
    if (this.quizsettings.amount == null) return;

    console.log("starting");
    this.quizStart.emit(this.quizsettings);
  }

}

export interface Quizsettings {
  theme: string,
  amount: number,
  repetitive: boolean,
}
