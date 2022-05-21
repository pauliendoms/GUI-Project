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
    themes: "",
    amount: 0,
    repetitive: false,
  }

  ngOnInit(): void {
    this.data.updateFolders();
  }

  startQuiz() {
    console.log("starting");
  }

}

export interface Quizsettings {
  themes: string,
  amount: number,
  repetitive: boolean,
}
