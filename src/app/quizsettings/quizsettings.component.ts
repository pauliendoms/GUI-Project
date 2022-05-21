import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-quizsettings',
  templateUrl: './quizsettings.component.html',
  styleUrls: ['./quizsettings.component.css']
})
export class QuizsettingsComponent implements OnInit {

  constructor(public data : DatabaseService) { }

  quizsettings : Quizsettings = {
    theme: "",
    amount: 0,
    repetitive: false,
  }

  selected : string = "";

  ngOnInit(): void {
    this.data.updateFolders();
  }

  startQuiz() {
    console.log(this.quizsettings);

    if (this.quizsettings.theme == "") return;
    if (this.quizsettings.amount == 0) return;

    console.log("starting");
  }

}

export interface Quizsettings {
  theme: string,
  amount: number,
  repetitive: boolean,
}
